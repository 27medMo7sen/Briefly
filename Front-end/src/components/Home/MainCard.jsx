import React from "react";
import UploadingForm from "./UploadingForm";
import { FaArrowRight } from "react-icons/fa6";
import { uiActions } from "../../../store/uiSlice";
import { useDispatch } from "react-redux";
function MainCard() {
  const dispatch = useDispatch();
  const handleUploadClick = () => {
    dispatch(uiActions.toggleIsUploadingOptionsOpened());
  };

  return (
    <div className="flex flex-col justify-center h-[70vh] gap-5 animate-slide-up ">
      <span className="bg-[var(--primary-light)] text-[var(--primary-dark)] font-semibold p-2 rounded-3xl w-[fit-content] ">
        🎉 It's a new era!
      </span>
      <div className="text-7xl text-[var(--primary-font-color)]">
        <span className="text-[var(--primary)] font-bold">Skip</span> the length
        <br />
        <span className="text-[var(--primary)] font-bold">Save</span> the value
      </div>
      <p className=" text-[var(--primary-font-color)]">
        start by uploading video
      </p>
      <button
        className="flex items-center w-[fit-content] bg-[var(--primary)]/80 text-white cursor-pointer font-semibold px-6 py-3 rounded-3xl gap-2 transition ease-in-out delay-150 hover:bg-[var(--primary)]"
        onClick={handleUploadClick}
      >
        Upload Video <FaArrowRight />
      </button>
      {/* <UploadingForm /> */}
    </div>
  );
}

export default MainCard;
