
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./ReduxSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer, 
  },
});
