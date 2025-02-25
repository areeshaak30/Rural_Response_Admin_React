import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowError: false,
  isShowSuccess: false,
  error: "",
  success: "",
  random: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showSuccessToast: (state, { payload }) => {
      state.isShowSuccess = true;
      state.success = payload;
      // reset error
      state.error = "";
      state.isShowError = false;
      state.random = Math.floor(Math.random() * 5).toString();
    },
    showErrorToast: (state, { payload }) => {
      state.isShowError = true;
      state.error = payload;

      // reset error
      state.success = "";
      state.isShowSuccess = false;
      state.random = Math.floor(Math.random() * 5).toString();
    },
  },
});

// Action creators are generated for each case reducer function
export const { showErrorToast, showSuccessToast } = toastSlice.actions;

export default toastSlice.reducer;
