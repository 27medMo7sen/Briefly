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
  const [isLoading, setIsLoading] = useState("");
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
      setError(null);

      // Ensure URL is a string
      console.log("URL:", url);
      const requestUrl = typeof url === "string" ? url : url.toString();

      const token = getToken();

      try {
        dispatch(uiActions.setTopLoaderProgress(50));
        console.log(isLoading);
        const response = await axios({
          url: requestUrl,
          method,
          data,
          headers: {
            "Content-Type": contentType || "application/json",
            ...(token && { Authorization: `TIMEISMONEY ${token}` }),
          },
          onUploadProgress,
        });

        setIsLoading("");
        dispatch(uiActions.setTopLoaderProgress(100));
        return response;
      } catch (error) {
        dispatch(uiActions.setTopLoaderProgress(100));

        // Handle token refresh if needed
        if (error.response && error.response.status === 432) {
          try {
            dispatch(uiActions.setTopLoaderProgress(50));
            const res = await axios.patch("users/refresh-token", {
              token: token,
            });

            localStorage.setItem("token", res.data.token);

            // Resend the request with new token
            const response = await axios({
              url: requestUrl,
              method,
              data,
              headers: {
                Authorization: `TIMEISMONEY ${res.data.token}`,
                "Content-Type": contentType || "application/json",
              },
              onUploadProgress,
            });

            setIsLoading("");
            dispatch(uiActions.setTopLoaderProgress(100));
            return { data: response.data, response };
          } catch (refreshError) {
            setIsLoading("");
            setError(refreshError);
            navigate("/auth?mode=signin");
            return { data: null, error: refreshError };
          }
        } else {
          setIsLoading("");
          setError(error);
          return { data: null, error, status: error.response?.status };
        }
      }
    },
    [dispatch, navigate]
  );

  return { isLoading, error, setIsLoading, sendRequest };
};
