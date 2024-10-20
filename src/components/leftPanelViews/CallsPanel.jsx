import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import CallList from "../CallsPanelComps/CallList";
import { useSelector } from "react-redux";

const CallsPanel = () => {
  const { listCall, loading, error } = useSelector((state) => state.callList);
  return (
    <div className="w-full h-screen flex flex-col">
      <HeaderOfLeftPanel />
      <CallList callData={listCall} loading={loading} error={error} />
    </div>
  );
};

export default CallsPanel;
