import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";

function Options() {
  const [search, setSearch] = useState("");
  return (
    <div className="h-[300px] flex flex-col items-center">
      <form className="flex items-center border-b-2 border-[var(--primary-font-color)] w-full max-w-[250px] ">
        <CiSearch className="text-[var(--primary-font-color)] text-lg" />
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 focus:outline-none border-[var(--primary-font-color)] placeholder-[var(--primary-font-color)] w-full bg-transparent text-[var(--primary-font-color)]"
          style={{ caretColor: "var(--primary-font-color)" }}
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex flex-col gap-5 mt-5 text-[var(--primary-font-color)] w-full max-w-[250px]">
        <button className="flex items-center gap-3 cursor-pointer">
          <FaRegTrashAlt className="text-[var(--primary-font-color)] min-w-6" />
          <span>Delete the whole library</span>
        </button>
        <button className="flex items-center gap-3 cursor-pointer">
          <FaRegPauseCircle className="text-[var(--primary-font-color)] text-lg min-w-6" />
          <span>Stop the library from saving summaries automatically</span>
        </button>
      </div>
    </div>
  );
}

export default Options;
