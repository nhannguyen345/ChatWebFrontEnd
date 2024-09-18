import React from "react";
import ResponsiveMenu from "../components/ResponsiveMenu";
import LeftPanel from "../components/LeftPanel";
import MainContentPanel from "../components/MainContentPanel";
import { useSelector } from "react-redux";
import ModalNotification from "../components/ModalNotification";

const Dashboard = () => {
  const modal = useSelector((state) => state.modal.isNotificationModalOpen);
  return (
    <div className="flex flex-row overflow-hidden w-screen max-sm:relative">
      <ResponsiveMenu />
      <LeftPanel />
      <MainContentPanel />
      {modal && <ModalNotification></ModalNotification>}
    </div>
  );
};

export default Dashboard;
