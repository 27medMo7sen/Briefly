import React, { useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import confirmationDone from "../../../assets/confirmationDone.png";
function Welcome() {
  console.log("Welcome");
  const { sendRequest, isLoading, setIsLoading, error } = useHttp();
  const [searchParams] = useSearchParams();
  const confirmationToken = searchParams.get("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!confirmationToken) return;
    console.log(confirmationToken);
    setIsLoading(true);
    const confirmUser = async () => {
      const res = await sendRequest(`user/confirm/${confirmationToken}`, "GET");
      console.log(res);
      const user = res.data.user;
      dispatch(authActions.setEmail(user.email));
      dispatch(authActions.setToken(user.token));
      dispatch(authActions.setUsername(user.username));
      dispatch(authActions.setRole(user.role));
      localStorage.setItem("email", user.email);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", user.token);
    };
    confirmUser();
  }, [confirmationToken]);

  return isLoading ? (
    <div className="text-white"></div>
  ) : error ? (
    <div className="text-white">{error.response.data.message}</div>
  ) : (
    <div className="text-center w-[300px] h-[fit-content] bg-[#F8FBFC] p-5 rounded-lg flex flex-col items-center justify-evenly">
      <h1 className="text-2xl font-bold">Welcome to Briefly!</h1>
      <img
        src={confirmationDone}
        alt="confirmation done"
        className="w-[100px] h-[100px]"
      />
      <p className="text-[var(--primary-font-color)] mb-2 text-lg font-semibold">
        Congratulations! Your registration is complete You're all set to start
        exploring. Click the button below to go to the homepage
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Welcome;
