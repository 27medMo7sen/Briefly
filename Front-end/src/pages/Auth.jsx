import React from "react";
import MainAuth from "../components/auth/MainAuth";
import darkSide from "../../assets/darkSideImage.png";
import lightSide from "../../assets/lightSideImage.png";
import { useSelector } from "react-redux";
function Auth() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <div className=" bg-[var(--base)]">
      <div className=" h-screen">
        <MainAuth />
      </div>
     
    </div>
  );
}

export default Auth;
