import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    activeContent: "Users",
    // data: false,
    // dataa: false,
  },
  reducers: {
    setActiveContent: (state, action) => {
      state.activeContent = action.payload;
    },
  },
});

export const { setActiveContent } = userSlice.actions;

export const selectActiveContent = (state) => state.tabs.activeContent;

export default userSlice.reducer;
