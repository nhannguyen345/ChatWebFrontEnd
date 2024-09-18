import { useDispatch, useSelector } from "react-redux";
import HeaderOfChatInfo from "../ChatInfoComps/HeaderOfChatInfo";
import ProfileSummary from "../ChatInfoComps/ProfileSummary";
import UserInformation from "../ChatInfoComps/UserInformation";

const ChatInfo = () => {
  const dispatch = useDispatch();
  const showInfoChat = useSelector((state) => state.showInfoChat);
  return (
    <div
      className={
        "min-w-[400px] max-sm:w-full max-sm:h-[calc(100vh-64px)] h-screen bg-white border-l overflow-y-scroll no-scrollbar " +
        (showInfoChat ? "" : "hidden")
      }
    >
      <HeaderOfChatInfo />
      <ProfileSummary />
      <UserInformation />
    </div>
  );
};

export default ChatInfo;
