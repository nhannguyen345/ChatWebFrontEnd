import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../utils/backendUrl";

// const backendURL = "http://localhost:8080";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/auth/register`,
        {
          username,
          email,
          password,
          avatarUrl:
            "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png",
          phone: "",
          address: "",
          fbLink: "",
          InstaLink: "",
          twitterLink: "",
        },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        {
          email,
          password,
        },
        config
      );

      sessionStorage.setItem("auth-tk-webchat", data.jwtToken);
      sessionStorage.setItem("user-info", JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAction("auth/logout");
