import {useState, useEffect} from "react";
import { MdAlternateEmail } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { TbEyeOff } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import { useInput } from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import { useHttp } from "../../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";
function SigninForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
  const { sendRequest, isLoading, setIsLoading, error } = useHttp();
  const signinHandler = (e) => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) return;
    const signinUser = async () => {
      setIsLoading(true);
      const res = await sendRequest("user/login", "POST", {
        email,
        password,
      });
      console.log(res);
      setIsLoading(false);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("token", res.data.user.token);
      dispatch(authActions.setEmail(res.data.user.email));
      dispatch(authActions.setToken(res.data.user.token));
      dispatch(authActions.setUsername(res.data.user.username));
      dispatch(authActions.setRole(res.data.user.role));

    };
    signinUser();
    resetEmail();
    resetPassword();
    navigate("/");
  };
  return (
    <form className="flex w-[300px] gap-3.5 flex-col animate-slide-right text-[var(--primary-font-color)] " onSubmit={signinHandler}>
      <h1 className="text-3xl font-semibold  text-[var(--primary-font-color)]">
        Sign in
      </h1>
      <div className="text-[var(--primary-font-color)]">
        <label
          className={`flex gap-1  text-lg items-center  ${
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
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:to-blue-400  ${
            emailHasError
              ? "border-red-500 bg-red-300 focus:bg-red-100 animate-shake"
              : "text-[var(--primary-font-color)]"
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
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:to-blue-400 ${
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
        you don't have an account?{" "}
        <Link to="/auth?mode=signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Sign in
      </button>
    </form>
  );
}

export default SigninForm;
