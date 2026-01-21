import { createSlice } from "@reduxjs/toolkit";

const ReduxSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    registerUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, registerUser } = ReduxSlice.actions;
export default ReduxSlice.reducer;
