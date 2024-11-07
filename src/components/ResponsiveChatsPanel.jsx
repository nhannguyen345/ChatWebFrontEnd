import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatsPanel from "./leftPanelViews/ChatsPanel";
import ChatContent from "./MainContentPanelComps/ChatContent";
import ChatInfo from "./MainContentPanelComps/ChatInfo";

const ResponsiveChatsPanel = () => {
  const dispatch = useDispatch();
  const chatPanelStatus = useSelector(
    (state) => state.panelVisibility.activeChatsMainPanel
  );
  const selectedConversationId = useSelector(
    (state) => state.message.selectedConversationId
  );

  return (
    <div className="w-full h-full">
      {/* Chats Panel */}
      <div
        className={`w-full h-full ${
          selectedConversationId && chatPanelStatus
            ? "animate-slide-left"
            : "animate-hidden-page"
        } sm:animate-none`}
      >
        <ChatsPanel />
      </div>

      {/* Chat Content */}
      {selectedConversationId && (
        <div
          className={`flex flex-1 h-full ${
            chatPanelStatus ? "animate-slide-right" : "animate-slide-left"
          } sm:flex`}
        >
          <ChatContent />
          <ChatInfo />
        </div>
      )}
    </div>
  );
};

export default ResponsiveChatsPanel;