import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./messageAction";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    listMess: [],
    selectedConversationId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    addNewConversation: (state, action) => {
      state.listMess.push(action.payload);
    },
    updateStatusErrorMess: (state, action) => {
      const tempId = action.payload;

      const conversationIndex = state.listMess.findIndex((conv) =>
        conv.messages.some((message) => message.tempId === tempId)
      );

      if (conversationIndex !== -1) {
        const updatedConversation = {
          ...state.listMess[conversationIndex],
          messages: state.listMess[conversationIndex].messages.map((message) =>
            message.tempId === tempId
              ? { ...message, statusMess: "error" }
              : message
          ),
        };

        state.listMess = [
          ...state.listMess.slice(0, conversationIndex),
          updatedConversation,
          ...state.listMess.slice(conversationIndex + 1),
        ];
      }
    },
    updateIdAndStatusMess: (state, action) => {
      const { tempId, newMessage, statusMess } = action.payload;
      console.log(action.payload);
      const conversationIndex = state.listMess.findIndex((conv) =>
        conv.messages.some((message) => message.tempId === tempId)
      );

      console.log(conversationIndex);

      if (conversationIndex !== -1) {
        const updatedConversation = {
          ...state.listMess[conversationIndex],
          lastMessageTime: newMessage.createdAt,
          messages: state.listMess[conversationIndex].messages.map((message) =>
            message.tempId === tempId
              ? { ...message, ...newMessage, statusMess: statusMess } // Cập nhật tin nhắn
              : message
          ),
        };
        console.log(updatedConversation);
        state.listMess = [
          ...state.listMess.slice(0, conversationIndex),
          updatedConversation,
          ...state.listMess.slice(conversationIndex + 1),
        ];
      }
    },
    addNewMessageFromSelf: (state, action) => {
      const conversationIndex = state.listMess.findIndex(
        (conv) =>
          conv.entity.id === action.payload.receiverId ||
          conv.entity.id === action.payload.groupId
      );

      if (conversationIndex !== -1) {
        const updatedConversation = {
          ...state.listMess[conversationIndex],
          messages: [
            ...state.listMess[conversationIndex].messages,
            action.payload,
          ],
          lastMessageTime: action.payload.createAt,
        };

        state.listMess = [
          ...state.listMess.slice(0, conversationIndex),
          updatedConversation,
          ...state.listMess.slice(conversationIndex + 1),
        ];
      }
    },
    addNewMessageFromOther: (state, action) => {
      const selectedConversationIndex = state.listMess.findIndex(
        (item) => item.entity.id === action.payload.sender.id
      );

      if (selectedConversationIndex !== -1) {
        // copy of conversation which has new message
        const updatedConversation = {
          ...state.listMess[selectedConversationIndex],
          messages: [
            ...state.listMess[selectedConversationIndex].messages,
            action.payload,
          ],
          lastMessageTime: action.payload.createAt,
        };

        // copy of listMess
        const newListMess = [...state.listMess];
        newListMess.splice(selectedConversationIndex, 1);
        newListMess.unshift(updatedConversation);

        state.listMess = newListMess;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listMess = action.payload;
        console.log(state.listMess);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedConversationId,
  addNewConversation,
  updateStatusErrorMess,
  updateIdAndStatusMess,
  addNewMessageFromSelf,
  addNewMessageFromOther,
} = messageSlice.actions;
export default messageSlice.reducer;
