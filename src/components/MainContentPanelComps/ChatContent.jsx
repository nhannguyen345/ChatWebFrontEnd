import { useState } from "react";
import HeaderOfChatContent from "../ChatContentComps/HeaderOfChatContent";
import MessageContainer from "../ChatContentComps/MessageContainer";
import MessageInputBox from "../ChatContentComps/MessageInputBox";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";

const ChatContent = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const { selectedConversationId, listMess, status } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();
  const showInfoChat = useSelector((state) => state.showInfoChat);
  const { postToCloudinary, uploading, error } = useCloudinaryUpload();
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [listChat, setListChat] = useState([]);

  // Hàm lấy tên file
  function getFileName(file) {
    return file.name;
  }

  // Hàm lấy dung lượng file (KB)
  function getFileSizeInKB(file) {
    const fileSizeInBytes = file.size;
    return (fileSizeInBytes / 1024).toFixed(2); // Chuyển đổi bytes sang KB và giới hạn 2 chữ số sau dấu phẩy
  }

  function getTypeSelectedConversation() {
    return listMess.filter((conv) => {
      return conv.entity.id === selectedConversationId;
    })?.type;
  }

  function generateIdMessage() {
    return "msg_" + (Math.random() + 1).toString(36).substring(2);
  }

  function createNewMessage(
    tempId,
    senderId,
    isGroup,
    receiverId,
    messageType = "TEXT",
    content = "",
    fileUrl = "",
    createAt = new Date()
  ) {
    return {
      tempId,
      senderId,
      receiverId: groupId ? null : receiverId,
      groupId: groupId ? receiverId : null,
      content,
      fileUrl,
      messageType,
      createAt,
      statusMess: "pending",
    };
  }

  const handleSendMessage = async (e) => {
    const file = selectedFile;
    const tempId = generateIdMessage();

    if (file) {
      const url_file = await postToCloudinary(file);
      if (url_file) {
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
          setListChat((prevChat) => [
            ...prevChat,
            createNewMessage(
              tempId,
              user.info.id,
              getTypeSelectedConversation(),
              selectedConversationId,
              "",
              url_file,
              "IMAGE"
            ),
          ]);
        } else {
          setListChat((prevChat) => [
            ...prevChat,
            createNewMessage(
              tempId,
              user.info.id,
              getTypeSelectedConversation(),
              selectedConversationId,
              getFileName(file) + "-" + getFileSizeInKB(file),
              url_file,
              "FILE"
            ),
          ]);
        }
        setSelectedFile(null);
      }
    } else {
      if (inputValue === "") return;
      setListChat((prevChat) => [
        ...prevChat,
        createNewMessage(
          tempId,
          user.info.id,
          getTypeSelectedConversation(),
          selectedConversationId,
          inputValue,
          "",
          "TEXT"
        ),
      ]);
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
      <MessageContainer listChat={listChat} setListChat={setListChat} />
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
