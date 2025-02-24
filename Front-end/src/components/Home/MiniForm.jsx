import React, { Fragment } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function MiniForm() {
  return (
    <div className="animate-slide-up">
      <p className="font-semibold text-2xl text-[var(--primary-font-color)] ">
        Stay informed as an indie hacker.
      </p>
      <p className="text-[var(--primary-font-color)] mb-2">
        Market insights that help you start and grow your business.
      </p>
      <form className="flex bg-[var(--primary-font-color)] text-[var(--base)] items-center justify-between p-2 gap-3 rounded-xl w-[300px]">
        <input type="email" placeholder="Enter your email" />
        <button
          type="submit"
          className=" text-white rounded-xl p-2 bg-gray-500"
        >
          <FaArrowRightLong />
        </button>
      </form>
    </div>
  );
}

export default MiniForm;
