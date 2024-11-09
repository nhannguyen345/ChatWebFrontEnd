import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import menuSlice from "../features/menu/menuSlice";
import panelVisibilitySlice from "../features/panelVisibility/panelVisibilitySlice";
import modalSlice from "../features/modal/modalSlice";
import showInfoChatSlice from "../features/showInfoChat/showInfoChatSlice";
import notificationSlice from "../features/notification/notificationSlice";
import messageSlice from "../features/message/messageSlice";
import callSlice from "../features/call/callSlice";
import callListSlice from "../features/callList/callListSlice";
import connectionStatusSlice from "../features/connectionStatus/connectionStatusSlice";
import { logout } from "../features/auth/authAction";

const appReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
  modal: modalSlice,
  panelVisibility: panelVisibilitySlice,
  showInfoChat: showInfoChatSlice,
  notification: notificationSlice,
  message: messageSlice,
  call: callSlice,
  callList: callListSlice,
  connectionStatus: connectionStatusSlice,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
