import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { authSlice } from "./authSlice";
import { librarySlice } from "./librarySlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    library: librarySlice.reducer,
  },
});
export default store;
