// In your Redux slice file (e.g., AlertsSlice.js)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inactiveAlerts: 0,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setInactiveAlerts(state, action) {
      state.inactiveAlerts = action.payload;
    },
  },
});

export const { setInactiveAlerts } = alertsSlice.actions;
export const selectInactiveAlerts = (state) =>
  state.FilterAlerts.inactiveAlerts;

export default alertsSlice.reducer;
