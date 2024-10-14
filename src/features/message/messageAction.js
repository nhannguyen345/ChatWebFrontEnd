import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (userId, { rejectWithValue }) => {
    const jwt = sessionStorage.getItem("auth-tk-webchat");
    console.log(userId);
    try {
      // const formData = new FormData();
      // formData.append("userId", userId);
      const response = await axios.post(
        "http://localhost:8080/message/get-list-messages",
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response.data);
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
