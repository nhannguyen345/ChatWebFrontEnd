import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import menuSlice from "../features/menu/menuSlice";
import panelVisibilitySlice from "../features/panelVisibility/panelVisibilitySlice";
import modalSlice from "../features/modal/modalSlice";
import showInfoChatSlice from "../features/showInfoChat/showInfoChatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice,
    modal: modalSlice,
    panelVisibility: panelVisibilitySlice,
    showInfoChat: showInfoChatSlice,
  },
});

export default store;
