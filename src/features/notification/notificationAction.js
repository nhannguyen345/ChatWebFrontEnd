import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userId, { getState }) => {
    const jwt = localStorage.getItem("auth-tk-webchat");
    const response = await axios.get(
      `http://localhost:8080/notification/get-list-notifications/${userId}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return response.data;
  }
);
