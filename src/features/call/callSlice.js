import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startingCall: {},
  call: {},
  receivingCall: false,
  callAccepted: false,
  callEnded: false,
};

const callSlice = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {
    setStartingCall: (state, action) => {
      state.startingCall = action.payload;
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
      state.startingCall = {};
      state.call = {};
      state.callAccepted = false;
      state.callEnded = false;
      state.receivingCall = false;
    },
  },
});

export const {
  setStartingCall,
  setStream,
  setCall,
  setCallAccepted,
  setCallEnded,
  setReceivingCall,
  resetCallState,
} = callSlice.actions;
export default callSlice.reducer;
