import { useState } from "react";
import HeaderOfChatContent from "../ChatContentComps/HeaderOfChatContent";
import MessageContainer from "../ChatContentComps/MessageContainer";
import MessageInputBox from "../ChatContentComps/MessageInputBox";
import { useDispatch, useSelector } from "react-redux";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import { addNewMessageFromSelf } from "../../features/message/messageSlice";
import { getFileName, getFileSizeInKB } from "../../utils/fileUtils";
import { generateIdMessage, createNewMessage } from "../../utils/messageUtils";
import { useStompClient } from "react-stomp-hooks";

const ChatContent = () => {
  const stompClient = useStompClient();
  const user = useSelector((state) => state.auth.userInfo);
  const { selectedConversationId, listMess } = useSelector(
    (state) => state.message
  );
  const showInfoChat = useSelector((state) => state.showInfoChat);
  const dispatch = useDispatch();
  const { postToCloudinary, uploading, error } = useCloudinaryUpload();
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [listChat, setListChat] = useState([]);

  function SendDataThroughWS(data) {
    stompClient.publish({
      destination: "/app/add-new-message",
      body: JSON.stringify(data),
    });
  }

  function getMessagesFromSelectedConversation() {
    const conve = listMess.filter((conv) => {
      return conv.entity.id === selectedConversationId;
    });
    return conve[0]?.messages;
  }

  function getTypeSelectedConversation() {
    return listMess.filter((conv) => {
      return conv.entity.id === selectedConversationId;
    })?.type;
  }

  const handleSendMessage = async (e) => {
    const file = selectedFile;
    const tempId = generateIdMessage();
    if (file) {
      const url_file = await postToCloudinary(file);
      if (url_file) {
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
          const imgeMess = createNewMessage(
            tempId,
            user.info.id,
            getTypeSelectedConversation(),
            selectedConversationId,
            "IMAGE",
            "",
            url_file
          );
          dispatch(addNewMessageFromSelf(imgeMess));
          SendDataThroughWS(imgeMess);
        } else {
          const fileMess = createNewMessage(
            tempId,
            user.info.id,
            getTypeSelectedConversation(),
            selectedConversationId,
            "FILE",
            getFileName(file) + "-" + getFileSizeInKB(file),
            url_file
          );
          dispatch(addNewMessageFromSelf(fileMess));
          SendDataThroughWS(fileMess);
        }
        setSelectedFile(null);
      }
    } else {
      if (inputValue === "") return;
      const textMess = createNewMessage(
        tempId,
        user.info.id,
        getTypeSelectedConversation(),
        selectedConversationId,
        "TEXT",
        inputValue,
        ""
      );
      console.log(textMess);
      dispatch(addNewMessageFromSelf(textMess));
      SendDataThroughWS(textMess);
      setInputValue("");
    }
  };

  return (
    <div
      className={
        "flex flex-col w-full h-screen max-sm:h-[calc(100vh-64px)] " +
        (showInfoChat ? "max-sm:hidden" : "")
      }
    >
      <HeaderOfChatContent />
      <MessageContainer
        listChat={getMessagesFromSelectedConversation()}
        setListChat={setListChat}
      />
      <MessageInputBox
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContent;
