import { createSlice } from "@reduxjs/toolkit";

// Tạo mới slice
export const panelVisibilitySlice = createSlice({
  name: "panelVisibility",
  initialState: {
    activeProfileMainPanel: false,
    activeChatsMainPanel: false,
  },
  reducers: {
    setProfileMainPanelVisibility: (state, action) => {
      state.activeProfileMainPanel = action.payload;
    },
    setChatsMainPanelVisibility: (state, action) => {
      state.activeChatsMainPanel = action.payload;
    },
  },
});

export const { setProfileMainPanelVisibility, setChatsMainPanelVisibility } =
  panelVisibilitySlice.actions;

export default panelVisibilitySlice.reducer;
