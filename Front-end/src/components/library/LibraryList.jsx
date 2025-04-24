import React, { useEffect } from "react";
import tempImage from "../../../assets/tempImage.jpeg";
import LibraryItem from "./LibraryItem";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { libraryActions } from "../../../store/librarySlice";
function LibraryList() {
  const libraryItems = useSelector((state) => state.library.items);
  const dispatch = useDispatch();
  const { isLoading, setIsLoading, sendRequest, error } = useHttp();
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  React.useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading("fetchingVideos");
      const response = await sendRequest("videos/retrieve", "GET");
      if (response.status === 200) {
        console.log("Videos fetched successfully", response);
        dispatch(libraryActions.setItems(response.data.videos));
      } else {
        console.log("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, []);
  return isLoading === "fetchingVideos" ? (
    <div className="flex justify-center items-center h-[80vh]">
      <h1 className="text-3xl text-[var(--primary-font-color)] font-bold bg-[var(--primary)]/20 p-4 rounded-2xl">
        Loading videos...
      </h1>
    </div>
  ) : libraryItems?.length > 0 ? (
    <div className="flex  flex-col gap-6 animate-slide-right">
      {libraryItems.map((item) => (
        <LibraryItem key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-[80vh]">
      <h1 className="text-3xl text-[var(--primary-font-color)] font-bold bg-[var(--primary)]/20 p-4 rounded-2xl">
        summarize you first video.
      </h1>
    </div>
  );
}

export default LibraryList;
