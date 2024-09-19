import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isNotificationModalOpen: false,
    isInviteModalOpen: false,
    isCreateGroupModalOpen: false,
  },
  reducers: {
    openNotificationModal: (state) => {
      state.isNotificationModalOpen = true;
    },
    closeNotificationModal: (state) => {
      state.isNotificationModalOpen = false;
    },
    openInviteModal: (state) => {
      state.isInviteModalOpen = true;
    },
    closeInviteModal: (state) => {
      state.isInviteModalOpen = false;
    },
    openCreateGroupModal: (state) => {
      state.isCreateGroupModalOpen = true;
    },
    closeCreateGroupModal: (state) => {
      state.isCreateGroupModalOpen = false;
    },
  },
});

export const {
  openNotificationModal,
  closeNotificationModal,
  openInviteModal,
  closeInviteModal,
  openCreateGroupModal,
  closeCreateGroupModal,
} = modalSlice.actions;
export default modalSlice.reducer;
