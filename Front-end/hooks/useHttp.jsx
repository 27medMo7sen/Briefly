import { useState, useCallback } from "react";
import axios from "axios";
import { uiActions } from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3000/api/";
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access");
  }
  return null;
};

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const sendRequest = useCallback(
    async (url, method = "GET", data = null, contentType = null) => {
      if(isLoading) return;
      setError(null);
      console.log("Sending request to:", url);
      const token = getToken();
      //   if (!token) {
      //     console.error(
      //       "JWT Token not found in localStorage. Please log in again."
      //     );
      //     return [];
      //   }
      console.log("here");
      try {
        dispatch(uiActions.setTopLoaderProgress(50));
        const response = await axios({
          url,
          method,
          data,
          headers: {
            Authorization: `TIMEISMONEY ${token}`,
            "Content-Type": contentType || "application/json",
          },
        });
        setIsLoading(false);
        console.log(response);
        dispatch(uiActions.setTopLoaderProgress(100));
        return response;
      } catch (error) {
        dispatch(uiActions.setTopLoaderProgress(100));
        console.log(error);
        if (error.response.status === 432) {
          // send refresh token
          try {
            dispatch(uiActions.setTopLoaderProgress(50));
            const res = await axios.post("token/refresh/", {
              refresh: localStorage.getItem("refresh"),
            });
            console.log(res.data);
            localStorage.setItem("access", res.data.access);
            // resend the request
            const response = await axios({
              url,
              method,
              data,
              headers: {
                Authorization: `TIMEISMONEY ${res.data.access}`,
                "Content-Type": contentType || "application/json",
              },
            });
            setIsLoading(false);
            console.log("Fetched data:", response.data);
            dispatch(uiActions.setTopLoaderProgress(100));
            return response;
          } catch (error) {
            redirect("/auth?mode=login");
            return [];
          }
        } else {
          setIsLoading(false);
          setError(error);
        }
        return;
      }
    },
    []
  );
  return { isLoading, error, setIsLoading, sendRequest };
};
