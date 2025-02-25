import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: 0,
};

const alertsXSlice = createSlice({
  name: "alertType",
  initialState,
  reducers: {
    setAlertType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { setAlertType } = alertsXSlice.actions;
export const selectAlertType = (state) => state.alertType.type;

export default alertsXSlice.reducer;
