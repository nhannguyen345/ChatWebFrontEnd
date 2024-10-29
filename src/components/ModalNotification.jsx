import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationModal } from "../features/modal/modalSlice";
import { IoMdClose } from "react-icons/io";
import useFetchData from "../hooks/useFetchData";
import { ImSpinner } from "react-icons/im";
import NotificationItem from "./NotificationItem";
import { fetchNotifications } from "../features/notification/notificationAction";
import axios from "axios";
import { markAllAsRead } from "../features/notification/notificationSlice";

const ModalNotification = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const user =
    useSelector((state) => state.auth.userInfo) ||
    JSON.parse(localStorage.getItem("user-info"));
  const modal = useSelector((state) => state.modal.isNotificationModalOpen);

  const { loading, error, notifications, unreadCount } = useSelector(
    (state) => state.notification
  );

  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị của modal
  const dispatch = useDispatch();

  const handleClearAll = () => {};

  useEffect(() => {
    if (modal) {
      setIsVisible(true); // Bắt đầu hiệu ứng khi modal mở
      if (unreadCount) {
        async function setReadNotification() {
          await axios.put(
            `http://localhost:8080/notification/updateReadStatus`,
            {},
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
        }
        setReadNotification();
      }
      dispatch(markAllAsRead());
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
              <ImSpinner className="animate-spin h-[18px] w-[18px]" />
            </div>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {notifications &&
            !loading &&
            !error &&
            notifications.map((item, idx) => (
              <NotificationItem key={idx} notification={item} jwt={jwt} />
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
