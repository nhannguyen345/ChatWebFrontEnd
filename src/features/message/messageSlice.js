import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./messageAction";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    listMess: [],
    selectedConversation: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listMess = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedConversation } = messageSlice.actions;
export default messageSlice.reducer;
