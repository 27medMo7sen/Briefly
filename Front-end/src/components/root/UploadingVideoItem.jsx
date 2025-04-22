import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { uiActions } from "../../../store/uiSlice";
import { useUploadsContext } from "../../context/UploadsContext";

export const UploadingVideoItem = ({ video }) => {
  const { sendRequest, isLoading, error, setIsLoading } = useHttp();
  const { toggleUploading, reduceCurrentUploads } = useUploadsContext();
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };

  // Calculate remaining size
  const uploadedSize = (
    ((progress / 100) * video?.file?.size) /
    (1024 * 1024)
  ).toFixed(1);
  const totalSize = (video?.file?.size / (1024 * 1024)).toFixed(1);

  // Calculate remaining time (placeholder - adjust with actual calculation)
  const uploadSpeed = ((progress / 100) * video?.file?.size) / (1024 * 1024); // MB per second
  const remainingSize = totalSize - uploadedSize; // MB
  const [remainingTime, setRemainingTime] = useState("Calculating...");

  useEffect(() => {
    if (uploadSpeed > 0) {
      const timeInSeconds = remainingSize / uploadSpeed;
      let time;
      if (timeInSeconds >= 3600) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.ceil((timeInSeconds % 3600) / 60);
        time = `${hours}h ${minutes}m remaining`;
      } else if (timeInSeconds >= 60) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.ceil(timeInSeconds % 60);
        time = `${minutes}m ${seconds}s remaining`;
      } else {
        time = `${Math.ceil(timeInSeconds)}s remaining`;
      }
      setRemainingTime(time);
    }
  }, [uploadSpeed, remainingSize]);
  useEffect(() => {
    if (progress === 100) {
      setRemainingTime("Upload complete");
    }
  }, [progress]);
  // Handle upload completion
  useEffect(() => {
    if (!video.uploading) return;
    const uploadVideo = async () => {
      const formData = new FormData();
      formData.append("video", video.file);

      const response = await sendRequest(
        "videos/upload/",
        "POST",
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress
      );

      if (response.status === 201) {
        dispatch(uiActions.removeUploadingVideo(video.id));
      } else {
        console.error("Error uploading video:", response.statusText);
      }
    };

    uploadVideo();
    toggleUploading(video.id);
    reduceCurrentUploads((prev) => prev - 1);
  }, []);

  return (
    video && (
      <div className="bg-navy-900 text-[var(--primary-font-color)] p-0.5 rounded ">
        <div className="mb-1">
          <h2 className="text-lg font-bold mb-1 overflow-x-hidden whitespace-nowrap text-ellipsis">
            {video?.file.name ||
              "The Psychology of Self-Motivation - Scott Geller (TEDx)"}
          </h2>
          <div className="flex justify-between text-sm text-[var(--primary-font-color)]/80">
            <span>
              {uploadedSize}/{totalSize}MB
            </span>
            <span>{remainingTime}</span>
          </div>
        </div>

        <div className="relative w-full h-1 bg-gray-700 rounded">
          <div
            className="absolute h-full bg-blue-500 rounded"
            style={{
              width: `${progress}%`,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>
    )
  );
};
