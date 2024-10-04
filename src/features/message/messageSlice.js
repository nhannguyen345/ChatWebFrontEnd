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

      for (let i = 0; i < state.listMess.length; i++) {
        const conversation = state.listMess[i];

        const messageIndex = conversation.messages.findIndex(
          (message) => message.messId === tempId
        );

        if (messageIndex !== -1) {
          conversation.messages[messageIndex].status = "error";
          break;
        }
      }
    },
    upadateIdAndStatusMess: (state, action) => {
      const { tempId, newMessageId, status } = action.payload;

      for (let i = 0; i < state.listMess.length; i++) {
        const conversation = state.listMess[i];

        const messageIndex = conversation.messages.findIndex(
          (message) => message.messId === tempId
        );

        if (messageIndex !== -1) {
          conversation.messages[messageIndex].messId = newMessageId;
          conversation.messages[messageIndex].status = status;
          break;
        }
      }
    },
    addNewMessageFromSelf: (state, action) => {
      for (let i = 0; i < state.listMess.length; i++) {
        const conversation = state.listMess[i];

        if (
          conversation.entity.id === action.payload.senderId ||
          conversation.entity.id === action.payload.groupId
        ) {
          conversation.messages.push(action.payload);
          conversation.lastMessageTime = action.payload.createAt;
          break;
        }
      }
    },
    addNewMessageFromOther: (state, action) => {
      const selectedConversationIndex = state.listMess.findIndex(
        (item) => (item.entity.id = action.payload.sender.id)
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
  upadateIdAndStatusMess,
  addNewMessageFromSelf,
  addNewMessageFromOther,
} = messageSlice.actions;
export default messageSlice.reducer;
