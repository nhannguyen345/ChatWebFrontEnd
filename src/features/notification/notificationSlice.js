import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "./notificationAction";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    markAllAsRead: (state) => {
      state.notifications.forEach((notif) => (notif.read = true));
      state.unreadCount = 0;
    },
    addNewNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    removeAllNotification: (state) => {
      state.notifications = [];
    },
    disableActionNotification: (state, action) => {
      state.notifications = state.notifications.map((notif) => {
        if (notif.id === action.payload) {
          return { ...notif, disable: true };
        }
        return notif;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(
          (notif) => !notif.read
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  markAllAsRead,
  addNewNotification,
  removeNotification,
  removeAllNotification,
  disableActionNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
