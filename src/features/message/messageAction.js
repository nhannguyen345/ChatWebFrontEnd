import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../utils/backendUrl";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (userId, { rejectWithValue }) => {
    const jwt = sessionStorage.getItem("auth-tk-webchat");
    try {
      const response = await axios.get(
        `${backendURL}/message/get-list-messages`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
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
