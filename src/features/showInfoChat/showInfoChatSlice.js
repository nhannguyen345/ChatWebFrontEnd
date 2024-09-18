import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const showInfoChatSlice = createSlice({
  name: "showInfoChat",
  initialState: false,
  reducers: {
    setShowInfoChat: (state, action) => {
      return action.payload;
    },
  },
});

// Tạo mới dispatch
export const { setShowInfoChat } = showInfoChatSlice.actions;

// xuất configureStore
export default showInfoChatSlice.reducer;
