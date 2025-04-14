import React from "react";
import tempImage from "../../../assets/tempImage.jpeg";
import LibraryItem from "./LibraryItem";
import { useSelector } from "react-redux";
function LibraryList() {
  const libraryItems = useSelector((state) => state.library.items);
  return libraryItems?.length > 0 ? (
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
