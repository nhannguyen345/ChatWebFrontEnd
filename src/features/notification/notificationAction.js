import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const jwt = sessionStorage.getItem("auth-tk-webchat");
      const response = await axios.get(
        `http://localhost:8080/notification/get-list-notifications`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
