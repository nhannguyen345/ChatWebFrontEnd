import React, { useEffect, useRef, useState } from "react";
import ResponsiveMenu from "../components/ResponsiveMenu";
import LeftPanel from "../components/LeftPanel";
import MainContentPanel from "../components/MainContentPanel";
import { useDispatch, useSelector } from "react-redux";
import ModalNotification from "../components/ModalNotification";
import InviteModal from "../components/InviteModal";
import CreateGroupModal from "../components/CreateGroupModal";
import { useStompClient } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";
import { fetchNotifications } from "../features/notification/notificationAction";
import { addNewNotification } from "../features/notification/notificationSlice";

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
  const dispatch = useDispatch();
  const subscriptionErrorsRef = useRef(null);
  const subscriptionAddNewNotifRef = useRef(null);

  useEffect(() => {
    if (stompClient) {
      // Đăng ký và lưu trữ subscription
      subscriptionErrorsRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/errors`,
        (message) => {
          toast.error(message.body);
        }
      );

      subscriptionAddNewNotifRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/notification`,
        (message) => {
          console.log(message);
          dispatch(addNewNotification(JSON.parse(message.body)));
        }
      );
    }

    // Cleanup function để hủy đăng ký
    return () => {
      if (subscriptionErrorsRef.current) {
        subscriptionErrorsRef.current.unsubscribe();
      }
    };
  }, [stompClient]);

  // fetch notifications
  useEffect(() => {
    dispatch(fetchNotifications(user.info.id));
  }, [dispatch, user.info.id]);

  // fetch list messages
  useEffect(() => {
    dispatch(fetchMessages(user.info.id)); // Dispatch lấy danh sách tin nhắn
  }, [dispatch, user.info.id]);

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
