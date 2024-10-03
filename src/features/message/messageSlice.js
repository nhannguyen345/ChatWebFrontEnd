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
    addNewMessageFromSelf: (state, action) => {
      state.listMess.map((conversation) => {
        if (
          conversation.entity.id === action.payload.senderId ||
          conversation.entity.id === action.payload.groupId
        ) {
          conversation.messages.push(payload);
        }
        return conversation;
      });
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

export const { setSelectedConversationId, addNewConversation } =
  messageSlice.actions;
export default messageSlice.reducer;
