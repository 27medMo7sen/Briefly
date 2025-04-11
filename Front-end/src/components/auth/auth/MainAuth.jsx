import React from "react";
import SigninForm from "./forms/SigninForm";
import { Link, useSearchParams } from "react-router-dom";
import SignupForm from "./forms/SignupForm";
import brieflyLogo from "../../../assets/brieflyLogo.png";
import brieflyLogoDark from "../../../assets/brieflyLogoDark.png";
import { useSelector } from "react-redux";
function MainAuth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  console.log(mode);
  return (
    <div className="ml-20 flex flex-col mt-5 gap-10 ">
      <Link to={"/"}>
        <img
          src={isDarkMode ? brieflyLogoDark : brieflyLogo}
          alt="briefly"
          className="w-40 object-contain"
        />
      </Link>
      <div className="flex flex-col w-full h-[80vh] justify-center items-center">
        {mode === "signin" && <SigninForm />}
        {mode === "signup" && <SignupForm />}
      </div>
    </div>
  );
}

export default MainAuth;
