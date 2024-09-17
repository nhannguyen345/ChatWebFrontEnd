import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const panelVisibilitySlice = createSlice({
  name: "panelVisibility",
  initialState: false,
  reducers: {
    setPanelVisibility: (state, action) => {
      return action.payload;
    },
  },
});

// Tạo mới dispatch
export const { setPanelVisibility } = panelVisibilitySlice.actions;

// xuất configureStore
export default panelVisibilitySlice.reducer;
