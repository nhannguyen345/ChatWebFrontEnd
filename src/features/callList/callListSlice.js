import { createSlice } from "@reduxjs/toolkit";
import { fetchCalls } from "./calListAction";

const callListSlice = createSlice({
  name: "callList",
  initialState: {
    listCall: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.listCall = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default callListSlice.reducer;
