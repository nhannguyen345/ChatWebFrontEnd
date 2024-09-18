import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ListChat from "../ChatsPanelComps/ListChat";

const ChatsPanel = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <HeaderOfLeftPanel />
      <ListChat />
    </div>
  );
};

export default ChatsPanel;
