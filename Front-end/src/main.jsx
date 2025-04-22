import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { UploadsProvider } from "./context/UploadsContext.jsx";
import store from "../store/index.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UploadsProvider>
      <App />
    </UploadsProvider>
  </Provider>
);
