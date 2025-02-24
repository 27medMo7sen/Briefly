import React from "react";
import MainAuth from "../components/auth/MainAuth";
import sideImage from "../../assets/sideImage.png";
function Auth() {
  return (
    <div className="grid grid-cols-2 bg-[var(--base)]">
      <div className="col-span-1   h-screen">
        <MainAuth />
      </div>
      <div className="col-span-1 hidden md:block">
        <img
          src={sideImage}
          alt="auth"
          className="h-screen w-full object-cover rounded-l-2xl"
        />
      </div>
    </div>
  );
}

export default Auth;
