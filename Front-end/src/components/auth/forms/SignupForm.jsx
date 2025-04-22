import React from "react";
import { useInput } from "../../../hooks/useInput";
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { LuLockKeyhole } from "react-icons/lu";
import { TbEyeOff } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import GoogleLogo from "../../../../assets/GoogleLogo.png";
import { Link, redirect } from "react-router-dom";
import { useHttp } from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { sendRequest, isLoading, error, setIsLoading } = useHttp();

  const navigate = useNavigate();

  const {
    enteredValue: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput((value) => value.trim().length >= 2);
  const {
    enteredValue: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  });
  const {
    enteredValue: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);
  const {
    enteredValue: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === password);
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState("student");
  console.log(password, confirmPassword);
  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      !usernameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      return;
    }
    const res = await sendRequest("user/signup", "POST", {
      username,
      email,
      password,
      confirmPassword,
      role,
    });
    if (res.status === 201) {
      console.log("User created successfully");
      navigate(`/confirmation?email=${email}&&token=${res.data.token}`);
    }
    if (res) {
      resetUsername();
      resetEmail();
      resetPassword();
      resetConfirmPassword();
      console.log(res);
    }
  };
  return (
    <form
      onSubmit={signupHandler}
      className="flex w-[300px] gap-3.5 flex-col animate-slide-right text-[var(--primary-font-color)] "
    >
      <h1 className="text-3xl font-semibold">Creat account</h1>
      <div>
        <label
          className={`flex gap-1  text-lg items-center ${
            usernameHasError
              ? "text-red-500"
              : "text-[var(--primary-font-color)]"
          } mb-1`}
        >
          <CiUser />
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2   ${
            usernameHasError
              ? "border-red-500 bg-red-300 focus:bg-red-100 animate-shake"
              : "border-gray-500"
          }`}
          required
        />
        <p
          className={`${
            !usernameHasError
              ? "hidden"
              : "text-red-500 text-sm animate-slideDown text-center animate-slide-down"
          }`}
        >
          username must be at least 2 characters long
        </p>
      </div>{" "}
      <div>
        <label
          className={`flex gap-1  text-lg items-center ${
            emailHasError ? "text-red-500" : "text-[var(--primary-font-color)]"
          } mb-1`}
        >
          <MdAlternateEmail />
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={email}
          name="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2    ${
            emailHasError
              ? "border-red-500 bg-red-300 focus:bg-red-100 animate-shake"
              : "border-gray-500"
          }`}
          required
        />
        <p
          className={`${
            !emailHasError
              ? "hidden"
              : " text-red-500 text-sm animate-slideDown text-center animate-slide-down"
          }`}
        >
          email must be in a valid format
        </p>
      </div>
      <div>
        <h2>User role</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex gap-1 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-blue-400 hover:border-blue-700 hover:text-white p-2 rounded-lg ${
              role === "student"
                ? "bg-blue-400 border-blue-700 border-2 text-white  "
                : ""
            }`}
            onClick={() => {
              setRole("student");
            }}
          >
            <PiStudent />
            student
          </button>
          <button
            type="button"
            className={`flex gap-1 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-blue-400 hover:border-blue-700 p-2 hover:text-white  rounded-lg ${
              role === "employer"
                ? "bg-blue-400 border-blue-700 text-white"
                : ""
            }`}
            onClick={() => {
              setRole("employer");
            }}
          >
            <PiSuitcaseSimple />
            employer
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            className={`flex gap-1 items-center font-medium text-lg ${
              passwordHasError
                ? "text-red-500"
                : "text-[var(--primary-font-color)]"
            }`}
          >
            <LuLockKeyhole /> Password <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--primary-font-color)] hover:text-gray-600"
          >
            {showPassword ? (
              <TbEye className="w-5 h-5" />
            ) : (
              <TbEyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={passwordChangeHandler}
          name="password"
          onBlur={passwordBlurHandler}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2   ${
            passwordHasError
              ? "border-red-500 bg-red-300 focus:bg-red-100 animate-shake"
              : "border-gray-500"
          }`}
          required
        />
        <p
          className={`${
            !passwordHasError
              ? "hidden"
              : "text-red-500 text-sm animate-slideDown text-center animate-slide-down"
          }`}
        >
          Password must be at least 6 characters long
        </p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            className={`flex gap-1 items-center font-medium text-lg ${
              confirmPasswordHasError
                ? "text-red-500"
                : "text-[var(--primary-font-color)]"
            }`}
          >
            <LuLockKeyhole /> Confirm password
            <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--primary-font-color)] hover:text-gray-600"
          >
            {showPassword ? (
              <TbEye className="w-5 h-5" />
            ) : (
              <TbEyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          name="confirmPassword"
          onBlur={confirmPasswordBlurHandler}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2   ${
            confirmPasswordHasError
              ? "border-red-500 bg-red-300 focus:bg-red-100 animate-shake"
              : "border-gray-500"
          }`}
          required
        />
        <p
          className={`${
            !confirmPasswordHasError
              ? "hidden"
              : "text-red-500 text-sm animate-slideDown text-center animate-slide-down"
          }`}
        >
          Passwords must be the same
        </p>
      </div>
      <div>
        already have an account?{" "}
        <Link to="/auth?mode=signin" className="text-blue-500">
          Sign in
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-[#0F96F0] text-white py-2 rounded-lg hover:bg-[#0f70f0] w-full cursor-pointer"
        >
          Create an account
        </button>
        <button
          type="button"
          className="bg-gray-100 text-black py-2 rounded-lg hover:bg-gray-200 w-full cursor-pointer flex justify-center items-center gap-1"
        >
          <img src={GoogleLogo} alt="google logo" className="w-8 h-8" />
          Sign up with Google
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
