import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeaderOfChatInfo from "../ChatInfoComps/HeaderOfChatInfo";
import ProfileSummary from "../ChatInfoComps/ProfileSummary";
import UserInformation from "../ChatInfoComps/UserInformation";
import ChatGroupInfo from "../ChatInfoComps/ChatGroupInfo";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useMemo, useState } from "react";

const ChatInfo = () => {
  const dispatch = useDispatch();
  const selectedConversationId = useSelector(
    (state) => state.message.selectedConversationId,
    shallowEqual
  );
  const listMess = useSelector((state) => state.message.listMess, shallowEqual);
  const showInfoChat = useSelector((state) => state.showInfoChat);

  const selectedConversation = useMemo(() => {
    return listMess.find((conv) => conv.entity.id === selectedConversationId);
  }, [selectedConversationId, listMess]);

  console.log(123);

  return (
    showInfoChat && (
      <div
        className={
          "min-w-[400px] max-sm:w-full max-sm:h-[calc(100vh-64px)] h-screen bg-white border-l overflow-y-scroll no-scrollbar "
        }
      >
        {selectedConversation && (
          <>
            <HeaderOfChatInfo />
            <ProfileSummary userInfo={selectedConversation.entity} />
            {selectedConversation.type === "friend" && (
              <UserInformation userInfo={selectedConversation.entity} />
            )}
            {selectedConversation.type === "group" && (
              <ChatGroupInfo
                selectedConversation={selectedConversation}
                groupInfo={selectedConversation.entity}
              />
            )}
          </>
        )}
      </div>
    )
  );
};

export default ChatInfo;
