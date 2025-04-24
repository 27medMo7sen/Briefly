import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import { uiActions } from "../../../store/uiSlice";
import { libraryActions } from "../../../store/librarySlice";

function LibraryItem({ item }) {
  const isDarkMode = useSelector((s) => s.ui.isDarkMode);
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);

  // make sure this URL actually serves up your .mp4
  const videoUrl = `${item.filePath}/original/${item.customId}.mp4`;

  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous"; // if CORS applies
    video.src = videoUrl;
    video.currentTime = 1; // grab at 1s

    const capture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      setThumbnail(canvas.toDataURL("image/png"));
    };

    video.addEventListener("loadeddata", () => {
      // wait until we can seek
      video.addEventListener("seeked", capture, { once: true });
    });
    // trigger seek
    video.load();
  }, [videoUrl]);

  return (
    <div
      className={`flex rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out relative group ${
        !isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
      onClick={() => {
        dispatch(uiActions.toggleIsShowingSummary());
        dispatch(libraryActions.setSelectedItem(item));
      }}
    >
      <img
        src={thumbnail || item.image || "/fallback-thumb.png"}
        className="w-[185px] h-[185px] rounded-2xl object-cover"
      />
      <div className="flex flex-col justify-between p-5 w-full">
        <div>
          <h2 className="text-3xl font-bold">{item.title}</h2>
          <p className="text-lg text-[var(--primary-font-color)]/80">
            {item.description}
          </p>
        </div>
        <span className="text-[var(--primary-font-color)] text-sm">
          {format(new Date(item.time_stamp), "MMMM dd, yyyy")}
        </span>
      </div>
      <button className="absolute top-2 right-2 group-hover:block hidden text-2xl cursor-pointer">
        <CiMenuKebab />
      </button>
    </div>
  );
}

export default LibraryItem;
