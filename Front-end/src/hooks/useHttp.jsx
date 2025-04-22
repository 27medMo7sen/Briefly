import { useState, useCallback } from "react";
import axios from "axios";
import { uiActions } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000/api/";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      data = null,
      contentType = null,
      onUploadProgress = null
    ) => {
      if (isLoading)
        return { data: null, error: "Request already in progress" };

      setIsLoading(true);
      setError(null);
      console.log("Sending request to:", url);

      const token = getToken();

      try {
        console.log("Fetching data...");
        dispatch(uiActions.setTopLoaderProgress(50));

        const response = await axios({
          url,
          method,
          data,
          headers: {
            "Content-Type": contentType || "application/json",
            ...(token && { Authorization: `TIMEISMONEY ${token}` }),
          },
          onUploadProgress,
        });

        setIsLoading(false);
        console.log(response);
        dispatch(uiActions.setTopLoaderProgress(100));
        return response;
      } catch (error) {
        dispatch(uiActions.setTopLoaderProgress(100));
        console.log(error.response.status);
        // Handle token refresh if needed
        if (error.response.status === 432) {
          try {
            dispatch(uiActions.setTopLoaderProgress(50));
            const res = await axios.patch("users/refresh-token", {
              token: token,
            });

            console.log(res.data);
            localStorage.setItem("token", res.data.token);

            // Resend the request with new token
            const response = await axios({
              url,
              method,
              data,
              headers: {
                Authorization: `TIMEISMONEY ${res.data.token}`,
                "Content-Type": contentType || "application/json",
              },
              onUploadProgress,
            });

            setIsLoading(false);
            console.log("Fetched data:", response.data);
            dispatch(uiActions.setTopLoaderProgress(100));
            return response;
          } catch (refreshError) {
            setIsLoading(false);
            setError(refreshError);
            navigate("/auth?mode=signin");
            return { data: null, error: refreshError };
          }
        } else {
          setIsLoading(false);
          console.log("Error:", error.message);
          if (error.response) {
            console.log(
              "Error response:",
              error.response.data,
              error.response.status
            );
          }
          setError(error);
          return { data: null, error };
        }
      }
    },
    [isLoading, dispatch, navigate]
  );

  return { isLoading, error, setIsLoading, sendRequest };
};
