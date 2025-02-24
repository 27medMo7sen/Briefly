import React from "react";
import brieflyLogo from "../../../assets/brieflyLogo.png";
import brieflyLogoDark from "../../../assets/brieflyLogoDark.png";
import { Link, NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { uiActions } from "../../../store/uiSlice";
function MainNavigation() {
  const activeClasses = "text-[var(--primary)]";
  const inActiveClasses =
    "text-[var(--primary-font-color)] hover:text-[var(--primary)] transition ease-in-out delay-150";
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const toggleDarkMode = () => {
    dispatch(uiActions.toggleDarkMode());
  };
  return (
    <div className=" flex justify-between h-15 items-center bg-[var(--base)] px-20 ">
      <img
        src={isDarkMode ? brieflyLogoDark : brieflyLogo}
        alt="logo"
        className="w-40"
      />
      <div className="flex gap-5 text-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeClasses : inActiveClasses
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
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
      <div className="flex justify-center items-center gap-5">
        <DarkModeSwitch
          style={{ fontSize: 30 }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
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
