import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isNotificationModalOpen: false,
  },
  reducers: {
    openNotificationModal: (state) => {
      state.isNotificationModalOpen = true;
    },
    closeNotificationModal: (state) => {
      state.isNotificationModalOpen = false;
    },
  },
});

export const { openNotificationModal, closeNotificationModal } =
  modalSlice.actions;
export default modalSlice.reducer;
