import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/root/MainNavigation";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/stars.png";
function Root() {
  return (
    <div
      className="bg-cover bg-center h-screen animate-move-background"
      style={{
        backgroundImage: `url(${stars})`,
      }}
    >
      <MainNavigation />
      <div className="px-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
