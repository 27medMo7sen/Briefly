import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isAuth: false,
    isDarkMode: localStorage.getItem("dark") === "true",
    isSummaryModalOpen: false,
    isUploadingOptionsOpened: false,
    isUploading: false,
    isShowingSummary: false,
    topLoaderProgress: 0,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("dark", state.isDarkMode);
    },
    setTopLoaderProgress(state, action) {
      state.topLoaderProgress = action.payload;
    },
    toggleIsSummaryModalOpen(state) {
      state.isSummaryModalOpen = !state.isSummaryModalOpen;
    },
    toggleIsShowingSummary(state) {
      state.isShowingSummary = !state.isShowingSummary;
    },
    toggleIsUploadingOptionsOpened(state) {
      state.isUploadingOptionsOpened = !state.isUploadingOptionsOpened;
    },
    toggleIsUploading(state) {
      state.isUploading = !state.isUploading;
    },
  },
});

export const uiActions = uiSlice.actions;
