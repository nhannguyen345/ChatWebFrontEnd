import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCaller: false,
  startingCall: {},
  call: {},
  receivingCall: false,
  callAccepted: false,
  callEnded: false,
  // this state use for load list call in tab calls
  loadListCalls: false,
};

const callSlice = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {
    setIsCaller: (state, action) => {
      state.isCaller = action.payload;
    },
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
    setLoadListCalls: (state, action) => {
      state.loadListCalls = action.payload;
    },
    resetCallState: (state) => {
      state.isCaller = false;
      state.startingCall = {};
      state.call = {};
      state.callAccepted = false;
      state.callEnded = false;
      state.receivingCall = false;
    },
  },
});

export const {
  setIsCaller,
  setStartingCall,
  setStream,
  setCall,
  setCallAccepted,
  setCallEnded,
  setReceivingCall,
  setLoadListCalls,
  resetCallState,
} = callSlice.actions;
export default callSlice.reducer;
