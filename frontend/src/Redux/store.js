import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./ReduxSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
