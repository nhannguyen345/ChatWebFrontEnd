import { createSlice } from "@reduxjs/toolkit";

const connectionStatusSlice = createSlice({
  name: "connectionStatus",
  initialState: {
    onlineFriends: [],
  },
  reducers: {
    setListFriendsOnline: (state, action) => {
      state.onlineFriends = [...action.payload];
    },
  },
});

export const { setMyStatusConn, setListFriendsOnline } =
  connectionStatusSlice.actions;
export default connectionStatusSlice.reducer;
