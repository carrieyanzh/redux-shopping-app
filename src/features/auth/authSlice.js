import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;

      if (username === "carrie" && password === "123") {
        state.isLoggedIn = true;
        state.user = { username };
        state.error = "";
      } else {
        state.isLoggedIn = false;
        state.user = null;
        state.error = "Invalid username or password.";
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = "";
    },

    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;