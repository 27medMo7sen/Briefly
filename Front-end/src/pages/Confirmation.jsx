import React, { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import Welcome from "../components/confirmation/Welcome";
import Check from "../components/confirmation/Check";
import confirmation from "../../assets/confirmation.png";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
function Confimation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { width, height } = useWindowSize();
  return (
    <Fragment>
      {(!email )? <Confetti width={width} height={height} /> : <></>}
      <div
        style={{
          backgroundImage: `url(${confirmation})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="flex justify-center items-center"
      >
        {email ? <Check email={email} /> : <Welcome />}
      </div>
    </Fragment>
  );
}

export default Confimation;
