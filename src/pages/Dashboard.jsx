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
import { fetchMessages } from "../features/message/messageAction";
import {
  addNewConversation,
  addNewMessageFromOther,
  upadateIdAndStatusMess,
  updateStatusErrorMess,
} from "../features/message/messageSlice";

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
  const subscriptionAddNewMessRef = useRef(null);
  const subscriptionSendMessSuccRef = useRef(null);
  const subscriptionSendMessErrRef = useRef(null);

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
          const newNotif = JSON.parse(message.body);
          dispatch(addNewNotification(newNotif));
          if (newNotif.notificationType === "FRIEND_REQUEST_ACCEPTED") {
            dispatch(
              addNewConversation({
                type: "friend",
                entity: newNotif.sender,
                lastMessageTime: null,
                messages: [],
              })
            );
          }
        }
      );

      subscriptionAddNewMessRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/new-message`,
        (message) => {
          const newMess = JSON.parse(message.body);
          dispatch(addNewMessageFromOther(newMess));
        }
      );

      subscriptionSendMessSuccRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/send-mess-success`,
        (message) => {
          console.log("test call");
          dispatch(upadateIdAndStatusMess(JSON.parse(message.body)));
        }
      );

      subscriptionSendMessErrRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/send-mess-error`,
        (message) => {
          dispatch(updateStatusErrorMess(message.body));
        }
      );
    }

    // Cleanup function để hủy đăng ký
    return () => {
      subscriptionErrorsRef.current?.unsubscribe();
      subscriptionAddNewNotifRef.current?.unsubscribe();
      subscriptionAddNewMessRef.current?.unsubscribe();
      subscriptionSendMessSuccRef.current?.unsubscribe();
      subscriptionSendMessErrRef.current?.unsubscribe();
    };
  }, [stompClient]);

  // fetch notifications
  useEffect(() => {
    dispatch(fetchNotifications(user.info.id));
    dispatch(fetchMessages(user.info.id));
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
