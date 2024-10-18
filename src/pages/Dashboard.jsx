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
  updateIdAndStatusMess,
  updateStatusErrorMess,
} from "../features/message/messageSlice";
import ImageModal from "../components/ImageModal";
import VideoCallInterface from "../components/VideoCallInterface";
import IncomingCall from "../components/IncomingCall";
import CallProvider from "../components/CallProvider";
import { setCall, setReceivingCall } from "../features/call/callSlice";

const Dashboard = () => {
  // get redux state
  const notificationModal = useSelector(
    (state) => state.modal.isNotificationModalOpen
  );
  const inviteModal = useSelector((state) => state.modal.isInviteModalOpen);
  const createGroupModal = useSelector(
    (state) => state.modal.isCreateGroupModalOpen
  );
  const imageModal = useSelector(
    (state) => state.modal.isImageModalOpen.status
  );
  const { receivingCall, callAccepted } = useSelector((state) => state.call);
  const user = useSelector((state) => state.auth.userInfo);

  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const subscriptionConnectedRef = useRef(null);
  const subscriptionErrorsRef = useRef(null);
  const subscriptionAddNewNotifRef = useRef(null);
  const subscriptionAddNewMessRef = useRef(null);
  const subscriptionSendMessSuccRef = useRef(null);
  const subscriptionSendMessErrRef = useRef(null);
  const subscribeCallReceiveCallRef = useRef();

  const callAcceptedRef = useRef(callAccepted);
  const receivingCallRef = useRef(receivingCall);

  useEffect(() => {
    callAcceptedRef.current = callAccepted;
  }, [callAccepted]);

  useEffect(() => {
    receivingCallRef.current = receivingCall;
  }, [receivingCall]);

  useEffect(() => {
    if (stompClient) {
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
          dispatch(updateIdAndStatusMess(JSON.parse(message.body)));
        }
      );

      subscriptionSendMessErrRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/send-mess-error`,
        (message) => {
          dispatch(updateStatusErrorMess(message.body));
        }
      );

      subscribeCallReceiveCallRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/receive-call`,
        (message) => {
          dispatch(setCall(JSON.parse(message.body)));
          dispatch(setReceivingCall(true));
          setTimeout(() => {
            if (!callAcceptedRef.current && receivingCallRef.current) {
              dispatch(setReceivingCall(false));
            }
          }, 29000);
        }
      );
    }

    // Cleanup function để hủy đăng ký
    return () => {
      subscriptionConnectedRef.current?.unsubscribe();
      subscriptionErrorsRef.current?.unsubscribe();
      subscriptionAddNewNotifRef.current?.unsubscribe();
      subscriptionAddNewMessRef.current?.unsubscribe();
      subscriptionSendMessSuccRef.current?.unsubscribe();
      subscriptionSendMessErrRef.current?.unsubscribe();
      subscribeCallReceiveCallRef?.current?.unsubscribe();
    };
  }, [stompClient]);

  // fetch notifications
  useEffect(() => {
    let idUser;

    if (!user?.info?.id) {
      const storedUser = JSON.parse(sessionStorage.getItem("user-info"));
      idUser = storedUser?.info?.id;
    } else {
      idUser = user.info.id;
    }

    if (idUser) {
      dispatch(fetchNotifications(idUser));
      dispatch(fetchMessages(idUser));
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-row overflow-hidden w-screen max-sm:relative">
      <ResponsiveMenu />
      <LeftPanel />
      <MainContentPanel />
      <CallProvider />
      {notificationModal && <ModalNotification></ModalNotification>}
      {inviteModal && <InviteModal></InviteModal>}
      {createGroupModal && <CreateGroupModal></CreateGroupModal>}
      {imageModal && <ImageModal></ImageModal>}
      <ToastContainer
        className={"z-50"}
        position="top-center"
        autoClose={2000}
      />
    </div>
  );
};

export default Dashboard;
