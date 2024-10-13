import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isNotificationModalOpen: false,
    isInviteModalOpen: false,
    isCreateGroupModalOpen: false,
    isImageModalOpen: {
      imageUrl: null,
      status: false,
    },
    isVideoCallModalOpen: false,
    isIncomingCallModalOpen: false,
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
    openImageModal: (state, action) => {
      state.isImageModalOpen = { ...action.payload };
    },
    openVideoCallModal: (state) => {
      state.isVideoCallModalOpen = true;
    },
    openIncomingCallModal: (state) => {
      state.isIncomingCallModalOpen = true;
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
    closeImageModal: (state, action) => {
      state.isImageModalOpen = { imageUrl: null, status: false };
    },
    closeVideoCallModal: (state) => {
      state.isVideoCallModalOpen = false;
    },
    closeIncomingCallModal: (state) => {
      state.isIncomingCallModalOpen = false;
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
  openImageModal,
  closeImageModal,
  openVideoCallModal,
  closeVideoCallModal,
  openIncomingCallModal,
  closeIncomingCallModal,
} = modalSlice.actions;
export default modalSlice.reducer;
