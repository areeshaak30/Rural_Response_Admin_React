import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    // 0 for Informational and 1 for Emergency
    activeTab: 0,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = alertsSlice.actions;

export const selectActiveTab = (state) => state.alertTab.activeTab;

export default alertsSlice.reducer;
