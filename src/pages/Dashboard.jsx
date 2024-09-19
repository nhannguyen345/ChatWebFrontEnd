import React from "react";
import ResponsiveMenu from "../components/ResponsiveMenu";
import LeftPanel from "../components/LeftPanel";
import MainContentPanel from "../components/MainContentPanel";
import { useSelector } from "react-redux";
import ModalNotification from "../components/ModalNotification";
import InviteModal from "../components/InviteModal";
import CreateGroupModal from "../components/CreateGroupModal";

const Dashboard = () => {
  const notificationModal = useSelector(
    (state) => state.modal.isNotificationModalOpen
  );
  const inviteModal = useSelector((state) => state.modal.isInviteModalOpen);
  const createGroupModal = useSelector(
    (state) => state.modal.isCreateGroupModalOpen
  );
  return (
    <div className="flex flex-row overflow-hidden w-screen max-sm:relative">
      <ResponsiveMenu />
      <LeftPanel />
      <MainContentPanel />
      {notificationModal && <ModalNotification></ModalNotification>}
      {inviteModal && <InviteModal></InviteModal>}
      {createGroupModal && <CreateGroupModal></CreateGroupModal>}
    </div>
  );
};

export default Dashboard;
