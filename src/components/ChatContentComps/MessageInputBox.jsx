import React, { useState } from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import Picker from "emoji-picker-react";
const MessageInputBox = ({
  inputValue,
  setInputValue,
  selectedFile,
  setSelectedFile,
  handleSendMessage,
}) => {
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const onEmojiClick = (emojiData, event) => {
    console.log(event);
    setInputValue((prevInput) => prevInput + emojiData.emoji);
  };
  // Hàm xử lý khi file được chọn
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="relative max-h-[100px] w-full px-4 py-4 gap-2 flex items-center border">
      <div
        className={
          displayEmoji ? "block absolute bottom-[60px] left-[10px]" : "hidden"
        }
      >
        <Picker onEmojiClick={onEmojiClick} />
      </div>
      <BsEmojiSmile
        className="inline-block h-[40px] w-[22px] text-[#535558] cursor-pointer"
        onClick={() => setDisplayEmoji(!displayEmoji)}
      />
      <div className="relative">
        <BsFileEarmarkArrowUp className="inline-block h-[40px] w-[24px] my-auto text-[#535558]" />
        <input
          className="absolute left-0 file:cursor-pointer w-[30px] opacity-0"
          type="file"
          multiple={false}
          onChange={handleFileChange}
        />
        {selectedFile && (
          <div className="h-[30px] absolute -top-[30px] left-0 z-10 flex items-center gap-2 w-fit p-4 bg-[#0096FF] text-[#ffffff] text-center rounded-sm shadow-sm">
            <span
              className="text-[14px] align-middle font-[500] max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </span>
            <TiDelete
              className="fill-[#FF0000] bg-[#ffffff] h-[16px] w-[16px] rounded-full text-center cursor-pointer"
              title="Delete file"
              onClick={() => setSelectedFile(null)}
            />
          </div>
        )}
      </div>
      <textarea
        className="resize-none flex-1 h-[50px] p-3 rounded-md outline-none font-sans border dark:bg-[#2c373d] dark:text-white"
        placeholder="Type a message"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <IoIosArrowRoundForward
        className="h-[44px] w-[44px] rounded-full bg-[#665dfe] text-[#ffffff] cursor-pointer hover:bg-[#4237fe]"
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default MessageInputBox;
