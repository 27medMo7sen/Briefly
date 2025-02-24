import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/root/MainNavigation";
import { useNavigate } from "react-router-dom";
function Root() {
 
  return (
    <Fragment>
      <MainNavigation />
      <div className="px-20">
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Root;
