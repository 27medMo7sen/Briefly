import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/root/MainNavigation";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/stars.png";
import socket from "../../socket";
import { useEffect } from "react";
function Root() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.emit("join", {
      room: `${localStorage.getItem("username")}->uploads`,
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
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
