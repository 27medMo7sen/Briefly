import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function Options() {
  const deleteicon = (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6154 4.34615L17.0385 14.1603C17.0074 14.6893 16.7753 15.1864 16.3897 15.5498C16.0041 15.9133 15.4942 16.1156 14.9643 16.1154H5.03569C4.50581 16.1156 3.99589 15.9133 3.6103 15.5498C3.22471 15.1864 2.99262 14.6893 2.96154 14.1603L2.38462 4.34615M7.92308 8.15384L10 10.2308M10 10.2308L12.0769 12.3077M10 10.2308L12.0769 8.15384M10 10.2308L7.92308 12.3077M2.03846 4.34615H17.9615C18.5348 4.34615 19 3.88092 19 3.30769V1.92307C19 1.34984 18.5348 0.884613 17.9615 0.884613H2.03846C1.46523 0.884613 1 1.34984 1 1.92307V3.30769C1 3.88092 1.46523 4.34615 2.03846 4.34615Z"
        stroke="#02090D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const puase = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 7V13M7.75 13V7M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
        stroke="#02090D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const [search, setSearch] = useState("");
  return (
    <div className="h-[300px] flex flex-col items-center ">
      <form className="flex items-center border-b-2 border-[var(--primary-font-color)]">
        <CiSearch className="text-[var(--primary-font-color)]" />
        <input
          type="text"
          placeholder="Search"
          className=" px-3 py-2 focus:outline-none border-[var(--primary-font-color)] placeholder-[var(--primary-font-color)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex flex-col gap-5 mt-5 text-[var(--primary-font-color)]  justify-center">
        <button className="flex items-center  gap-2 w-[250px] cursor-pointer">
          <span>{deleteicon}</span>
          <p>Delete the whole library</p>
        </button>
        <button className="flex items-center  gap-2 w-[250px] cursor-pointer">
          <span>{puase}</span>
          <p>Stop the library from saving summaries automatically </p>
        </button>
      </div>
    </div>
  );
}

export default Options;
