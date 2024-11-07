import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatContent from "./MainContentPanelComps/ChatContent";
import ChatInfo from "./MainContentPanelComps/ChatInfo";
import ProfileSettingContent from "./MainContentPanelComps/ProfileSettingContent";
import WelcomeChatContent from "./WelcomeChatContent";

const MainContentPanel = () => {
  const dispatch = useDispatch();
  const selectedConversationId = useSelector(
    (state) => state.message.selectedConversationId
  );
  const menu = useSelector((state) => state.menu.activeTab);
  const panelVisibility = useSelector((state) => state.panelVisibility);
  return (
    <div
      className={
        "inline-block w-full h-screen max-sm:hidden"
        // (panelVisibility
        //   ? "max-sm:w-full max-sm:z-10 max-sm:animate-slide-left"
        //   : "max-sm:w-full max-sm:z-10 max-sm:animate-slide-right max-sm:absolute")
      }
    >
      {menu !== "profile" &&
        (selectedConversationId ? (
          <div className={"flex"}>
            <ChatContent />
            <ChatInfo />
          </div>
        ) : (
          <WelcomeChatContent />
        ))}
      {menu === "profile" && <ProfileSettingContent />}
    </div>
  );
};

export default MainContentPanel;
