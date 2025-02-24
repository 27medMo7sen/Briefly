import React from "react";
import confirmation from "../../../assets/confirmationCheck.png";
function Check({ email }) {
  return (
    <div className="text-center w-[500px] h-[600px] bg-[#F8FBFC] p-5 rounded-lg flex flex-col items-center gap-20">
      <div>
        {" "}
        <img
          src={confirmation}
          alt="confirmation"
          className="h-32 w-32 mx-auto"
        />
        <h1 className="text-4xl font-bold">Email Confirmation</h1>
      </div>
      <p className="font-semibold text-3xl">
        A confirmation email has been sent to {email}. Please check your email
        and click on the link to confirm your account
      </p>
    </div>
  );
}

export default Check;
