import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatContent from "./MainContentPanelComps/ChatContent";
import ChatInfo from "./MainContentPanelComps/ChatInfo";
import ProfileSettingContent from "./MainContentPanelComps/ProfileSettingContent";

const MainContentPanel = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.activeTab);
  const panelVisibility = useSelector((state) => state.panelVisibility);
  return (
    <div
      className={
        "inline-block w-full h-screen max-sm:w-full " +
        (panelVisibility
          ? "max-sm:z-10 max-sm:animate-slide-left"
          : "max-sm:z-10 max-sm:animate-slide-right max-sm:absolute")
      }
    >
      {menu !== "profile" && (
        <div className={"flex"}>
          <ChatContent />
          <ChatInfo />
        </div>
      )}
      {menu === "profile" && <ProfileSettingContent />}
    </div>
  );
};

export default MainContentPanel;
