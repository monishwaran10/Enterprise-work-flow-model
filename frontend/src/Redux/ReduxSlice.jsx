
import { createSlice } from "@reduxjs/toolkit";
const registerSlice = createSlice({
  name: "register", 
  initialState: {
    user: [], 
  },
  reducers: {
    saveUser: (state, action) => {
      state.user.push(action.payload)
    },
  },
});
export const { saveUser } = registerSlice.actions;
export default registerSlice.reducer;
