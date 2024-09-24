import React, { useEffect, useRef, useState } from "react";
import ResponsiveMenu from "../components/ResponsiveMenu";
import LeftPanel from "../components/LeftPanel";
import MainContentPanel from "../components/MainContentPanel";
import { useSelector } from "react-redux";
import ModalNotification from "../components/ModalNotification";
import InviteModal from "../components/InviteModal";
import CreateGroupModal from "../components/CreateGroupModal";
import WebSocketProvider from "../components/WebSocketProvider";
import { useStompClient } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  // const [errorMessage, setErrorMessage] = useState();
  const notificationModal = useSelector(
    (state) => state.modal.isNotificationModalOpen
  );
  const inviteModal = useSelector((state) => state.modal.isInviteModalOpen);
  const createGroupModal = useSelector(
    (state) => state.modal.isCreateGroupModalOpen
  );
  const user = useSelector((state) => state.auth.userInfo);
  const stompClient = useStompClient();
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (stompClient) {
      // Đăng ký và lưu trữ subscription
      subscriptionRef.current = stompClient.subscribe(
        `/user/${user.username}/queue/errors`,
        (message) => {
          toast.error(message);
        }
      );
    }

    // Cleanup function để hủy đăng ký
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [stompClient]);

  return (
    <div className="flex flex-row overflow-hidden w-screen max-sm:relative">
      <ResponsiveMenu />
      <LeftPanel />
      <MainContentPanel />
      {notificationModal && <ModalNotification></ModalNotification>}
      {inviteModal && <InviteModal></InviteModal>}
      {createGroupModal && <CreateGroupModal></CreateGroupModal>}
      <ToastContainer className={"z-50"} position="top-center" />
    </div>
  );
};

export default Dashboard;
