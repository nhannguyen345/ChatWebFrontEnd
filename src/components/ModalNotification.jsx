import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationModal } from "../features/modal/modalSlice";
import { IoMdClose } from "react-icons/io";
import { FaUserPlus, FaCheckCircle, FaComment, FaImage } from "react-icons/fa";
import { format } from "date-fns";
import useFetchData from "../hooks/useFetchData";
import { ImSpinner } from "react-icons/im";

const notificationEntities = [
  {
    id: 1,
    receiver: {
      id: 321, // ID của người nhận
      username: "Alice Johnson",
    },
    sender: {
      id: 123, // ID của người gửi
      username: "John Doe",
    },
    content: "You have a friend request from John Doe.",
    notificationType: "FRIEND_REQUEST",
    read: false,
    createdAt: new Date("2024-09-09T08:30:00Z"),
  },
  {
    id: 2,
    receiver: {
      id: 321,
      username: "Alice Johnson",
    },
    sender: {
      id: 456,
      username: "Jane Smith",
    },
    content: "Jane Smith has accepted your friend request.",
    notificationType: "FRIEND_REQUEST",
    read: false,
    createdAt: new Date("2024-09-09T09:00:00Z"),
  },
  {
    id: 3,
    receiver: {
      id: 321,
      username: "Alice Johnson",
    },
    sender: {
      id: 789,
      username: "Emily Johnson",
    },
    content: "You have a new message from Emily Johnson.",
    notificationType: "MESSAGE",
    read: false,
    createdAt: new Date("2024-09-09T09:30:00Z"),
  },
  // Thêm các thông báo khác nếu cần
];

const NotificationItem = ({ notification }) => {
  // Format date function
  const formatDate = (dateString) => {
    // const date = new Date(dateString);
    return format(dateString, "yyyy-MM-dd h:mma");
  };

  // Component contain two button: reject, accept. Use for type friend-request notification
  const renderActionButtons = () => {
    if (notification.notificationType === "FRIEND_REQUEST") {
      return (
        <div className="w-full flex justify-center items-center gap-4 mt-2">
          <button className="h-[36px] align-middle text-[#ff337c] bg-white border border-[#ff337c] hover:bg-[#ff337c] hover:text-white px-3 py-1 rounded">
            Reject
          </button>
          <button className="h-[36px] bg-[#665dfe] text-white hover:bg-[#4237fe] px-3 py-1 rounded">
            Accept
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
    </div>
  );
};

const ModalNotification = () => {
  const { data, loading, error } = useFetchData("http://localhost:8080/");
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị của modal
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isNotificationModalOpen);

  useEffect(() => {
    if (modal) {
      setIsVisible(true); // Bắt đầu hiệu ứng khi modal mở
    } else {
      setIsVisible(false); // Khi modal đóng, ẩn hiệu ứng
    }
  }, [modal]);
  return (
    <div className={"fixed inset-0 z-50 flex items-center justify-center "}>
      {/* background black */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(closeNotificationModal())}
      ></div>

      {/* Modal Notification */}
      <div
        className={`bg-white flex flex-col max-h-[520px] sm:max-w-[240px] md:max-w-[400px] rounded-lg z-10 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header Modal */}
        <div className="p-4 flex items-center text-[#495057] border-b">
          <h5 className="text-[17px] font-medium">Notifications</h5>
          <IoMdClose
            className="h-[22px] w-[22px] md:ml-[250px] sm:ml-[180px] text-[#adb5bd] cursor-pointer hover:text-black"
            onClick={() => dispatch(closeNotificationModal())}
          />
        </div>

        {/* Body Modal */}
        <div className="flex-1 overflow-y-scroll no-scrollbar">
          {loading && (
            <div className="flex justify-center items-center">
              <ImSpinner className="animate-spin h-[18px] w-[18px]" />{" "}
              {/* Vòng xoay loading */}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center">
              {error.message} {/* Hiển thị thông báo lỗi */}
            </div>
          )}
          {data &&
            !loading &&
            !error &&
            data.map((item, idx) => (
              <NotificationItem key={idx} notification={item} />
            ))}
        </div>

        {/* Footer Modal */}
        <div className="w-full p-4 text-center">
          <p className="text-[#adb5bd] hover:cursor-pointer">Clear all</p>
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
