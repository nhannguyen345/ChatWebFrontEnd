import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (userId, { rejectWithValue }) => {
    const jwt = localStorage.getItem("auth-tk-webchat");
    try {
      const response = await axios.post(
        "http://localhost:8080/mesage/get-list-messages",
        {
          userId,
        },
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
