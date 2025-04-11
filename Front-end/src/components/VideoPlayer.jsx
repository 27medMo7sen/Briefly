import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
function VideoPlayer({ options, themeName = "fantasy" }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      playerRef.current = videojs(videoElement, options);
    }
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, videoRef, playerRef]);
  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className={`video-js vjs-big-play-centered vjs-theme-${themeName} min-w-[700px] min-h-[400px]`}
      />
    </div>
  );
}

export default VideoPlayer;
