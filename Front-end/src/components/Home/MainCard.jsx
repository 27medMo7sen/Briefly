import React from "react";
import UploadingForm from "./UploadingForm";

function MainCard() {
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
      <UploadingForm />
    </div>
  );
}

export default MainCard;
