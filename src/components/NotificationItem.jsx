import React, { useState } from "react";
import { FaCheckCircle, FaComment, FaImage, FaUserPlus } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useStompClient } from "react-stomp-hooks";
import {
  disableActionNotification,
  removeNotification,
} from "../features/notification/notificationSlice";
import { format } from "date-fns";

const NotificationItem = ({ notification, jwt }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const stompClient = useStompClient();
  // Format date function
  const formatDate = (dateString) => {
    // const date = new Date(dateString);
    return format(dateString, "yyyy-MM-dd h:mma");
  };

  // Component contain two button: reject, accept. Use for type friend-request notification
  const renderActionButtons = () => {
    const handleClickRejectButton = async () => {
      setIsRejecting(true);
      try {
        await axios.delete(
          `http://localhost:8080/notification/delete-notification/${notification.id}`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
      } catch (e) {
        console.error("Failed to reject notification", e);
        setErrorMessage(e.getMessage());
      } finally {
        setIsRejecting(false); // Stop loading
        dispatch(removeNotification(notification.id));
      }
    };

    const handleClickAcceptButton = () => {
      setIsAccepting(true);
      try {
        stompClient.publish({
          destination: "/app/add-new-friend",
          body: JSON.stringify({
            userId: user.id,
            userName: user.username,
            friendId: notification.sender.id,
            friendName: notification,
            notificationId: notification.id,
          }),
        });
      } catch (e) {
        console.error("Failed to reject notification", e);
        setErrorMessage(e.getMessage());
      } finally {
        setIsAccepting(false); // Stop loading
        dispatch(disableActionNotification(notification.id));
      }
    };

    if (notification.notificationType === "FRIEND_REQUEST") {
      return (
        <div className="w-full flex justify-center items-center gap-4 mt-2">
          <button
            className="h-[36px] align-middle text-[#ff337c] bg-white border border-[#ff337c] hover:bg-[#ff337c] hover:text-white px-3 py-1 rounded"
            disabled={notification.disable}
            onClick={handleClickRejectButton}
          >
            {isRejecting ? (
              <ImSpinner className="animate-spin h-[18px] w-[18px]" />
            ) : (
              "Reject"
            )}
          </button>
          <button
            className="h-[36px] bg-[#665dfe] text-white hover:bg-[#4237fe] px-3 py-1 rounded"
            disabled={notification.disable}
            onClick={handleClickAcceptButton}
          >
            {isAccepting ? (
              <ImSpinner className="animate-spin h-[18px] w-[18px]" />
            ) : (
              "Accept"
            )}
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-3 border-b border-gray-200">
      <div className="flex items-start ">
        <div className="mr-4">
          {/* Replace this with the actual icon based on type */}
          <div className="rounded-full bg-[#665dfe] w-12 h-12 flex items-center justify-center text-white">
            {notification.notificationType === "FRIEND_REQUEST" && (
              <FaUserPlus />
            )}
            {notification.notificationType === "FRIEND_REQUEST_ACCEPTED" && (
              <FaCheckCircle />
            )}
            {notification.notificationType === "MESSAGE" && <FaComment />}
            {notification.notificationType === "profile_update" && <FaImage />}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold text-blue-500">
              {notification.sender.username}
            </span>{" "}
            {notification.content}
          </p>
          <p className="text-gray-400 text-sm">
            {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
      {renderActionButtons()}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default NotificationItem;