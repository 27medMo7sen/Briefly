import { useSelector } from "react-redux";
import { UploadingVideoItem } from "./UploadingVideoItem";
import { useUploadsContext } from "../../context/UploadsContext";

export const UploadingVideoList = () => {
  const { uploads } = useUploadsContext();
  const isCurrentUploadsOpened = useSelector(
    (state) => state.ui.isCurrentUploadsOpened
  );

  return (
    <div
      className={`absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col gap-5 
        bg-[var(--base-bg)] rounded-xl text-[var(--primary-font-color)] 
        border border-dashed border-gray-700 min-w-48 w-[400px] z-10 p-1 
        h-80 ${
          !isCurrentUploadsOpened ? "invisible" : "visible animate-slide-down"
        }`}
    >
      <h1 className="font-semibold text-xl pb-0.5 border-b-2 px-3 pt-2">
        Current Uploads
      </h1>

      <div
        className="overflow-y-auto flex-1 px-3 pb-2
        scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent
        scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500
        dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500"
      >
        {uploads.length === 0 ? (
          <div className="text-center py-4">No videos are being uploaded</div>
        ) : (
          uploads.map((video) => {
            return <UploadingVideoItem key={video.id} video={video} />;
          })
        )}
      </div>
    </div>
  );
};
