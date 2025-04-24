import React, { useEffect, useState } from "react";
import brieflyLogo from "../../../assets/brieflyLogo.png";
import brieflyLogoDark from "../../../assets/brieflyLogoDark.png";
import { Link, NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { uiActions } from "../../../store/uiSlice";
import { IoMdCloudUpload } from "react-icons/io";
import { UploadingVideoList } from "./UploadingVideoList";
import { useUploadsContext } from "../../context/UploadsContext";

function MainNavigation() {
  const activeClasses =
    "text-[var(--primary)] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]";
  const inActiveClasses =
    "text-[var(--primary-font-color)] hover:text-[var(--primary)] transition ease-in-out delay-150";
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const { uploads, numberOfCurrentUploads } = useUploadsContext();

  // State for in-progress uploads count
  const [inProgressUploads, setInProgressUploads] = useState(0);

  // Update the in-progress count whenever uploads changes
  useEffect(() => {
    const inProgressCount = uploads.reduce((acc, upload) => {
      if (upload.uploading === true) {
        return acc + 1;
      }
      return acc;
    }, 0);

    console.log("Uploads updated:", uploads);
    console.log("Calculated in-progress uploads:", inProgressCount);

    setInProgressUploads(inProgressCount);
  }, [uploads]); // Only depend on uploads array

  const toggleDarkMode = () => {
    dispatch(uiActions.toggleDarkMode());
  };

  return (
    <div className="flex justify-between h-15 items-center bg-[var(--base)] px-20">
      <img
        src={isDarkMode ? brieflyLogoDark : brieflyLogo}
        alt="logo"
        className="w-40"
      />

      {/* Enhanced Nav Links Container */}
      <div className="relative">
        {/* Simple blurred background with border */}
        <div className="flex gap-5 text-2xl bg-[var(--primary-font-color)]/2 backdrop-blur-md rounded-3xl px-6 py-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`${token ? "/library" : "/auth?mode=signin"}`}
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Library
          </NavLink>
          <NavLink
            to="/payment"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Payment
          </NavLink>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="relative">
          <button
            onClick={() => {
              dispatch(uiActions.toggleCurrentUploadsOpened());
            }}
            className="flex flex-col cursor-pointer text-2xl text-[var(--primary-font-color)] relative"
            aria-label={`${inProgressUploads} videos uploading`}
          >
            <IoMdCloudUpload />
            {/* Debug inProgressUploads value */}
            {console.log(
              "Rendering with inProgressUploads:",
              numberOfCurrentUploads
            )}
            {/* Improved badge styling to ensure visibility */}
            {numberOfCurrentUploads > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold z-10">
                {numberOfCurrentUploads}
              </span>
            )}
          </button>
          <UploadingVideoList />
        </div>
        <DarkModeSwitch
          style={{ fontSize: 30 }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}
        />
        <button className="text-2xl text-[var(--primary-font-color)]">
          <IoNotificationsOutline />
        </button>
        {!token && (
          <Link
            to="/auth?mode=signin"
            className="text-2xl bg-[var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--primary)]/80 transition ease-in-out delay-150"
          >
            Get Started
          </Link>
        )}
        {token && (
          <div className="flex gap-5 items-center">
            <p className="text-lg text-[var(--primary-font-color)]">
              {username}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainNavigation;
