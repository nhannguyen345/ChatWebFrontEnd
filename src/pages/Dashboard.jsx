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
  deleteConversation,
  setSelectedConversationId,
  updateIdAndStatusMess,
  updateStatusErrorMess,
} from "../features/message/messageSlice";
import ImageModal from "../components/ImageModal";
import VideoCallInterface from "../components/VideoCallInterface";
import IncomingCall from "../components/IncomingCall";
import CallProvider from "../components/CallProvider";
import { setCall, setReceivingCall } from "../features/call/callSlice";
import { fetchCalls } from "../features/callList/calListAction";
import { setListFriendsOnline } from "../features/connectionStatus/connectionStatusSlice";
import { addNewGroups } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
  const selectedConversationId = useSelector(
    (state) => state.message.selectedConversationId
  );

  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const subscriptionGetUsersOnlineRef = useRef(null);
  const subscriptionErrorsRef = useRef(null);
  const subscriptionAddNewNotifRef = useRef(null);
  const subscriptionAddNewMessRef = useRef(null);
  const subscriptionSendMessSuccRef = useRef(null);
  const subscriptionSendMessErrRef = useRef(null);
  const subscribeCallReceiveCallRef = useRef();
  const subscribeChatGroupsRef = useRef({});
  const subscribeNewChatGroupsRef = useRef();

  const callAcceptedRef = useRef(callAccepted);
  const receivingCallRef = useRef(receivingCall);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.info?.username) {
      toast.error("Sorry, You to login again!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    callAcceptedRef.current = callAccepted;
  }, [callAccepted]);

  useEffect(() => {
    receivingCallRef.current = receivingCall;
  }, [receivingCall]);

  useEffect(() => {
    if (stompClient) {
      subscriptionGetUsersOnlineRef.current = stompClient.subscribe(
        "/topic/getUsersOnline",
        (message) => {
          dispatch(setListFriendsOnline(JSON.parse(message.body)));
        }
      );

      subscriptionErrorsRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/errors`,
        (message) => {
          toast.error(message.body);
        }
      );

      subscriptionAddNewNotifRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/notification`,
        (message) => {
          const newNotif = JSON.parse(message.body);
          if (newNotif.notificationType === "FRIEND_REQUEST_ACCEPTED") {
            dispatch(addNewNotification(newNotif));
            dispatch(
              addNewConversation({
                type: "friend",
                entity: newNotif.sender,
                lastMessageTime: null,
                messages: [],
              })
            );
          } else if (
            newNotif?.notification?.notificationType === "ADD_NEW_GROUP"
          ) {
            dispatch(addNewNotification(newNotif.notification));
            dispatch(
              addNewConversation({
                type: "group",
                entity: newNotif.groupMember.group,
                lastMessageTime: null,
                messages: [],
              })
            );
            dispatch(addNewGroups(newNotif.groupMember));
          } else if (newNotif.notificationType === "UNFRIEND") {
            dispatch(addNewNotification(newNotif));
            dispatch(deleteConversation(newNotif.sender.id + "_" + "friend"));
            if (newNotif.sender.id + "_" + "friend" === selectedConversationId)
              dispatch(setSelectedConversationId(null));
          } else {
            dispatch(addNewNotification(newNotif));
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
              setTimeout(() => dispatch(fetchCalls()), 1500);
            }
          }, 29000);
        }
      );

      //! call list users online
      stompClient.publish({
        destination: "/app/send-online-signal",
      });
    }

    return () => {
      subscriptionGetUsersOnlineRef.current?.unsubscribe();
      subscriptionErrorsRef.current?.unsubscribe();
      subscriptionAddNewNotifRef.current?.unsubscribe();
      subscriptionAddNewMessRef.current?.unsubscribe();
      subscriptionSendMessSuccRef.current?.unsubscribe();
      subscriptionSendMessErrRef.current?.unsubscribe();
      subscribeCallReceiveCallRef?.current?.unsubscribe();
    };
  }, [stompClient]);

  // Subscribe event chat group
  useEffect(() => {
    if (stompClient && user?.groupMembers) {
      user?.groupMembers.forEach((group) => {
        subscribeChatGroupsRef.current[group.group.id] = stompClient.subscribe(
          `/topic/group/${group.group.id}_${group.group.name}_${
            group.group.createdAt.split("+")[0] + "Z"
          }`,
          (message) => {
            const newMess = JSON.parse(message.body);
            if (newMess.sender.username !== user.info.username) {
              dispatch(addNewMessageFromOther(newMess));
            }
          }
        );
      });

      return () => {
        Object.values(subscribeChatGroupsRef.current).forEach((sub) => {
          sub.unsubscribe();
        });
      };
    }
  }, [stompClient, dispatch, user.groupMembers]);

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
      dispatch(fetchCalls());
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
