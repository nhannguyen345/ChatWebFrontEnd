import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "./notificationAction";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unreadCount: 0, // Số lượng thông báo chưa đọc
    loading: false,
    error: null,
  },
  reducers: {
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(
        (notif) => notif.id === notificationId
      );
      if (notification) {
        notification.read = true;
      }
      state.unreadCount = state.notifications.filter(
        (notif) => !notif.read
      ).length;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notif) => (notif.read = true));
      state.unreadCount = 0;
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
        ).length; // Cập nhật số lượng thông báo chưa đọc
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { markAsRead, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
