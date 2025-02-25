import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/features/CounterSlice";
import TabsSlice from "./features/TabsSlice";
import alertsSlice from "./features/AlertsTabSlice";
import FilterAlertsSlice from "./features/FilterAlertsSlice";
import ActiveInActiveAlerts from "./features/ActiveInActiveAlerts";
import ToastSlice from "./features/ToastSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tabs: TabsSlice,
    alertTab: alertsSlice,
    FilterAlerts: FilterAlertsSlice,
    alertType: ActiveInActiveAlerts,
    toast: ToastSlice,
  },
});
