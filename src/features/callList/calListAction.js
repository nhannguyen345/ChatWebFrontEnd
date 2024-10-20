import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCalls = createAsyncThunk(
  "callList/fetchCalls",
  async (_, { rejectWithValue }) => {
    const jwt = sessionStorage.getItem("auth-tk-webchat");
    try {
      const response = await axios.get(
        "http://localhost:8080/call/get-list-calls",
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
