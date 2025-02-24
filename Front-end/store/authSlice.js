import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
