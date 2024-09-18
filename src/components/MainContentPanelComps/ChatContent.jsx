import { useState } from "react";
import HeaderOfChatContent from "../ChatContentComps/HeaderOfChatContent";
import MessageContainer from "../ChatContentComps/MessageContainer";
import MessageInputBox from "../ChatContentComps/MessageInputBox";
import { useDispatch, useSelector } from "react-redux";

const ChatContent = () => {
  const dispatch = useDispatch();
  const showInfoChat = useSelector((state) => state.showInfoChat);
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

  const handleSendMessage = (e) => {
    // Kiểm tra có file được gửi hay không
    const file = selectedFile;
    if (file) {
      const fileType = file.type;
      // Kiểm tra có phải là file ảnh hay không
      if (fileType.startsWith("image/")) {
        setListChat((prevChat) => [
          ...prevChat,
          {
            messId: 1,
            senderId: "1",
            receiverId: "2",
            contentType: "image",
            content: "",
            urlFile:
              "https://inkythuatso.com/uploads/thumbnails/800/2023/02/5-hinh-anh-bau-binh-minh-ung-hong-tren-bai-bien-va-bau-troi-xanh-ngat-inkythuatso-06-16-53-01.jpg",
            sendAt: "9:12am",
          },
        ]);
      } else {
        setListChat((prevChat) => [
          ...prevChat,
          {
            messId: 1,
            senderId: "1",
            receiverId: "2",
            contentType: "file",
            content: getFileName(file) + "-" + getFileSizeInKB(file),
            urlFile: "",
            sendAt: "9:12am",
          },
        ]);
      }
      setSelectedFile(null);
    } else {
      if (inputValue === "") return;
      setListChat((prevChat) => [
        ...prevChat,
        {
          messId: 1,
          senderId: "1",
          receiverId: "2",
          contentType: "text",
          content: inputValue,
          urlFile: "",
          sendAt: "9:12am",
        },
      ]);
    }
    setInputValue("");
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
