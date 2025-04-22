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
    currentVideoId: 0,
    uploadingVideos: [],
    uploading: false,
    isCurrentUploadsOpened: false,
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
    pushNewVideo(state, action) {
      state.uploadingVideos.push({
        id: state.currentVideoId,
        file: action.payload,
      });
      state.currentVideoId += 1;
    },
    removeVideo(state, action) {
      state.uploadingVideos = state.uploadingVideos.filter(
        (video) => video.id !== action.payload
      );
    },
    toggleUploading(state) {
      state.uploading = !state.uploading;
    },
    toggleCurrentUploadsOpened(state) {
      state.isCurrentUploadsOpened = !state.isCurrentUploadsOpened;
    },
  },
});

export const uiActions = uiSlice.actions;
