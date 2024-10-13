import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stream: null,
  call: {},
  receivingCall: false,
  callAccepted: false,
  callEnded: false,
};

const callSlice = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setCall: (state, action) => {
      state.call = action.payload;
    },
    setCallAccepted: (state, action) => {
      state.callAccepted = action.payload;
    },
    setCallEnded: (state, action) => {
      state.callEnded = action.payload;
    },
    setReceivingCall: (state, action) => {
      state.receivingCall = action.payload;
    },
    resetCallState: (state) => {
      state.stream = null;
      state.call = {};
      state.callAccepted = false;
      state.callAccepted = false;
      state.receivingCall = false;
    },
  },
});

export const {
  setStream,
  setCall,
  setCallAccepted,
  setCallEnded,
  setReceivingCall,
  resetCallState,
} = callSlice.actions;
export default callSlice.reducer;
