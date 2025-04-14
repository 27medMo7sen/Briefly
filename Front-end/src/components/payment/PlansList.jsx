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

  // Plan data structure
  const plans = [
    {
      name: "Free Plan",
      price: null,
      bgColor: "bg-[var(--primary)]/30",
      textColor: "text-[var(--primary-font-color)]",
      buttonColor: "bg-[var(--primary)]",
      hoverColor: "hover:bg-[var(--primary)]/80",
      features: [
        "Summarize 1 video per month",
        "Basic text summary format",
        "Video length limit: 10 minutes",
        "Standard processing time",
      ],
      additionalClasses: "mt-[150px]",
    },
    {
      name: "Pro plan",
      price: "$15/month",
      bgColor: "bg-[#170B26]",
      textColor: "text-white/80",
      buttonColor: "bg-[#9747FF]",
      hoverColor: "hover:bg-[#9747FF]/80",
      features: [
        "Summarize up to 20 videos per month",
        "Customizable summary format",
        "Video length limit: 1 hour",
        "Priority processing",
        "Downloadable summaries",
      ],
      additionalClasses: "",
    },
    {
      name: "Premium Plan",
      price: "$30/month",
      bgColor: "bg-[var(--primary)]/30",
      textColor: "text-[var(--primary-font-color)]",
      buttonColor: "bg-[var(--primary)]",
      hoverColor: "hover:bg-[var(--primary)]/80",
      features: [
        "Unlimited video summaries",
        "Advanced summary format",
        "No video length limit",
        "Fast-track processing",
        "Personalized summary styles",
        "Priority support",
      ],
      additionalClasses: "mt-[110px]",
    },
  ];

  return (
    <div className={`h-[70vh] flex justify-evenly items-center`}>
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`flex flex-col items-center gap-5 ${
            plan.bgColor
          } px-6 py-6 rounded-xl ${plan.textColor} ${
            plan.additionalClasses
          } animate-slide-up hover:-translate-y-2 transition ease-in-out delay-150 ${
            index !== 0 ? "h-[60vh]" : "h-[50vh] justify-between"
          }`}
        >
          <div
            className={`flex flex-col gap-5 w-[300px] ${
              index === 1 ? "flex-grow" : ""
            }`}
          >
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1 className="text-center text-2xl font-bold border-b-2 border-[var(--primary-dark)]/40 w-full">
                {plan.name}
              </h1>
              {plan.price && (
                <p className="text-center text-xl font-bold">{plan.price}</p>
              )}
            </div>
            <ul className="flex flex-col gap-3 font-semibold text-lg">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex gap-2 items-center">
                  <span className="w-10px">{icon}</span>
                  <li>{feature}</li>
                </div>
              ))}
            </ul>
          </div>
          {index === 1 ? (
            <div className="w-full px-4 mt-4">
              <button
                className={`w-full text-xl font-bold ${plan.buttonColor} text-white py-3 rounded-lg ${plan.hoverColor} transition ease-in-out delay-150 cursor-pointer shadow-lg`}
              >
                Subscribe now
              </button>
            </div>
          ) : (
            <button
              className={`text-2xl ${plan.buttonColor} text-white px-5 py-2 rounded-lg ${plan.hoverColor} transition ease-in-out delay-150 cursor-pointer`}
            >
              Subscribe now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlansList;
