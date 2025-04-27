# video_summarizer_api.py
import re
import json
import os
from flask import Flask, request, jsonify
from openai import OpenAI
from moviepy import VideoFileClip, concatenate_videoclips

# === CONFIG ===
OUTPUT_VIDEO_TEMPLATE = "{basename}_summary.mp4"
AUDIO_TEMP_PATH = "temp_audio.wav"

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize Flask app
app = Flask(__name__)


def extract_audio(video_path: str, audio_path: str = AUDIO_TEMP_PATH) -> str:
    """
    Extracts the audio track from the given video and saves it as a WAV file.
    Returns the path to the audio file.
    """
    clip = VideoFileClip(video_path)
    # Write audio as mono WAV at 16 kHz for Whisper
    clip.audio.write_audiofile(audio_path, fps=16000, nbytes=2, codec='pcm_s16le')
    clip.close()
    return audio_path


def create_srt(video_path: str) -> str:
    """
    Generate an SRT subtitle file from the given video using OpenAI Whisper API.
    Extracts audio first for efficiency.
    Returns the path to the generated .srt file.
    """
    # Derive .srt path from video path
    base = video_path.rsplit('.', 1)[0]
    srt_path = f"{base}.srt"
    # Extract audio to a temporary file
    audio_path = extract_audio(video_path)

    # Call Whisper transcription endpoint with SRT output
    with open(audio_path, 'rb') as audio_file:
        srt_content = client.audio.transcriptions.create(
            file=audio_file,
            model="whisper-1",
            response_format="srt"
        )

    # Write out the SRT file
    with open(srt_path, 'w', encoding='utf-8') as f:
        f.write(srt_content)

    # Clean up temp audio
    try:
        os.remove(audio_path)
    except OSError:
        pass

    return srt_path


def parse_srt(srt_path: str):
    """Parse SRT file into a list of {id, start, end, text} segments."""
    with open(srt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = (
        r'(\d+)'                                  # index
        r'\s+'                                    # whitespace
        r'(\d{2}:\d{2}:\d{2},\d{3}) --> '     # start timestamp
        r'(\d{2}:\d{2}:\d{2},\d{3})'           # end timestamp
        r'\s+([\s\S]*?)(?=\n\n|\Z)'          # text
    )
    matches = re.findall(pattern, content)
    segments = []
    for index, start, end, text in matches:
        segments.append({
            'id':    int(index),
            'start': start.replace(',', '.'),
            'end':   end.replace(',', '.'),
            'text':  text.replace('\n', ' ').strip(),
        })
    return segments


def select_segments_with_llm(segments, model="gpt-4"):  # noqa: C901
    """
    Ask the LLM to score every segment (0–1) and select the key ones.
    Returns:
      - selected_ids: List[int]
      - scores: Dict[int, float]
    """
    context = "\n".join(f"[{s['id']}] {s['text']}" for s in segments)
    system_msg = "You are an expert video editor."
    user_msg = (
        "Below is a video transcript broken into subtitle segments.\n"
        "Rate each segment's importance on a 0-to-1 scale. Then choose which you'd include in a short summary.\n\n"
        "Respond only with JSON: {\n"
        '  "scores": [ {"id": 1, "score": 0.87}, … ],\n'
        '  "selected": [1, 3, 5, …]\n'
        "}\n\n"
        f"{context}"
    )
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user",   "content": user_msg},
        ]
    )
    raw = resp.choices[0].message.content
    try:
        data = json.loads(raw)
        scores = {item['id']: float(item['score']) for item in data['scores']}
        selected_ids = [int(i) for i in data['selected']]
    except Exception as e:
        app.logger.error(f"LLM parsing error: {e}")
        return [], {}
    return selected_ids, scores


def convert_to_seconds(ts: str) -> float:
    """Convert HH:MM:SS.xxx to seconds."""
    h, m, s = ts.split(':')
    return int(h) * 3600 + int(m) * 60 + float(s)


def generate_video_with_moviepy(segments, selected_ids, video_path, output_path):
    """Cut and concat using MoviePy."""
    orig = VideoFileClip(video_path)
    clips = []
    for seg in segments:
        if seg['id'] in selected_ids:
            start = convert_to_seconds(seg['start'])
            end = convert_to_seconds(seg['end'])
            if end > start:
                clips.append(orig.subclipped(start, end))
    if not clips:
        return None
    final = concatenate_videoclips(clips)
    final.write_videofile(
        output_path,
        codec="libx264",
        audio_codec="aac",
        fps=orig.fps,
        temp_audiofile="temp-audio.m4a",
        remove_temp=True
    )
    return output_path


@app.route('/summarize', methods=['POST'])
def summarize_endpoint():
    """
    HTTP API endpoint. Expects JSON {"video_path": "path/to/video.mp4"}.
    Returns JSON {"summary_path": "..."}.
    """
    data = request.get_json()
    video_path = data.get('video_path')
    if not video_path:
        return jsonify({'error': 'Missing "video_path" parameter'}), 400

    # 1) Generate SRT from audio
    srt_path = create_srt(video_path)
    # 2) Parse subtitles
    segments = parse_srt(srt_path)
    # 3) LLM selection
    keep_ids, _ = select_segments_with_llm(segments)
    # 4) Output video
    basename = video_path.rsplit('.', 1)[0]
    output_path = OUTPUT_VIDEO_TEMPLATE.format(basename=basename)
    result = generate_video_with_moviepy(segments, keep_ids, video_path, output_path)
    if not result:
        return jsonify({'error': 'No segments selected'}), 500
    return jsonify({'summary_path': result})

#example request : post http://localhost:5000/summarize
#example body : {"video_path": "path/to/video.mp4"}
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
