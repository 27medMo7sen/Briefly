import { Fragment, useState, useEffect } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Root from "./pages/Root";
import { uiActions } from "../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Library from "./pages/Library";
import LoadingBar from "react-top-loading-bar";
import Confimation from "./pages/Confirmation";
const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/library",
        element: <Library />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "confirmation",
    element: <Confimation />,
  },
]);

function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
 
  useEffect(() => {
    document
      .getElementsByTagName("body")[0]
      .setAttribute("dark-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.ui.topLoaderProgress);
  return (
    <Fragment>
      <LoadingBar
        color="var(--primary)"
        height={6}
        progress={progress}
        onLoaderFinished={() => dispatch(uiActions.setTopLoaderProgress(0))}
      />
      <RouterProvider router={BrowserRouter}></RouterProvider>
    </Fragment>
  );
}

export default App;
