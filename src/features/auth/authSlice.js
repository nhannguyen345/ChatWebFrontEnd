import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";

// const userToken = localStorage.getItem("auth-tk-webchat")
//   ? localStorage.getItem("auth-tk-webchat")
//   : null;

const initialState = {
  loading: false,
  userInfo: {},
  // sessionSocketId: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
    // setSessionSocketId: (state, action) => {
    //   state.sessionSocketId = action.payload;
    //   console.log(state.sessionSocketId);
    // },
    addNewGroups: (state, action) => {
      const listGroupsNew = [...state.userInfo.groupMembers];
      listGroupsNew.push(action.payload);
      state.userInfo = {
        ...state.userInfo,
        groupMembers: listGroupsNew,
      };
    },
    setUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        info: { ...state.userInfo.info, ...action.payload },
      };
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload;
        state.userToken = payload.jwtToken;
        console.log(state.userToken);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log(state.error);
      });
  },
});

export default authSlice.reducer;
export const { resetState, addNewGroups, setUserInfo, clearUserInfo } =
  authSlice.actions;
