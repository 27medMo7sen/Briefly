import React from "react";

function PlansList() {
  const icon = (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8L8 12L6 10M1 3V10.0557C1 13.0859 2.71202 15.856 5.42229 17.2111L9 19L12.5777 17.2111C15.288 15.856 17 13.0859 17 10.0557V3L16.303 3.07744C13.8542 3.34953 11.3912 2.70802 9.3863 1.27594L9 1L8.6137 1.27594C6.60878 2.70802 4.14576 3.34953 1.69699 3.07744L1 3Z"
        stroke="#0F96F0"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <div className="h-[70vh] flex justify-evenly items-center">
      <div className="flex flex-col  items-center gap-5 bg-[var(--primary)]/30 px-5 py-5 rounded-xl justify-between h-[50vh] animate-slide-up mt-[150px] text-[var(--primary-font-color)] hover:-translate-y-2 transition ease-in-out delay-150">
        <div className="flex flex-col gap-10 w-[300px]">
          <h1 className="text-center text-2xl font-bold  border-b-2 border-[var(--primary-dark)]/40 w-full">
            Free Plan
          </h1>
          <ul className="flex flex-col gap-3 font-semibold text-lg ">
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Summarize 1 video per month</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Basic text summary format</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Video length limit: 10 minutes</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Standard processing time </li>
            </div>
          </ul>
        </div>
        <button className="text-2xl bg-[var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--primary)]/80 transition ease-in-out delay-150 cursor-pointer">
          Subscribe now
        </button>
      </div>
      <div className="flex flex-col  items-center gap-5 bg-[#170B26] px-5 py-5 rounded-xl text-white/80 justify-between h-[50vh] animate-slide-up hover:-translate-y-2 transition ease-in-out delay-150 ">
        <div className="flex flex-col gap-5 w-[300px] ">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-center text-2xl font-bold  border-b-2 border-[var(--primary-dark)]/40 w-full">
              Pro plan
            </h1>
            <p className="tex-center tex-xl font-bold">$15/month</p>
          </div>
          <ul className="flex flex-col gap-3 font-semibold text-lg ">
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Summarize up to 20 videos per month</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Customizable summary format (bullet points, highlights)</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Video length limit: 1 hour</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Priority processing </li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Downloadable summaries (PDF, TXT)</li>
            </div>
          </ul>
        </div>
        <button className="text-2xl bg-[#9747FF] text-white px-5 py-2 rounded-lg hover:bg-[#9747FF]/80 transition ease-in-out delay-150 cursor-pointer">
          Subscribe now
        </button>
      </div>
      <div className="flex flex-col  items-center gap-5 bg-[var(--primary)]/30 px-5 py-5 rounded-xl justify-between h-[50vh] animate-slide-up mt-[110px] text-[var(--primary-font-color)] hover:-translate-y-2 transition ease-in-out delay-150">
        <div className="flex flex-col gap-5 w-[300px]">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-center text-2xl font-bold  border-b-2 border-[var(--primary-dark)]/40 w-full">
              Premium Plan
            </h1>
            <p className="tex-center tex-xl font-bold">$30/month</p>
          </div>
          <ul className="flex flex-col gap-3 font-semibold text-lg ">
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Unlimited video summaries</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Advanced summary format (text, visuals, key takeaways)</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>No video length limit</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Fast-track processing</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Personalized summary styles</li>
            </div>
            <div className="flex gap-2  items-center">
              <span className="w-10px">{icon}</span>
              <li>Priority support</li>
            </div>
          </ul>
        </div>
        <button className="text-2xl bg-[var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--primary)]/80 transition ease-in-out delay-150 cursor-pointer">
          Subscribe now
        </button>
      </div>
    </div>
  );
}

export default PlansList;
