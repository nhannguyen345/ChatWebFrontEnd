import React, { useEffect, useRef, useState } from "react";
import TextMessageRightSide from "./TextMessageRightSide";
import TextMessageLeftSide from "./TextMessageLeftSide";
import FileMessageLeftSide from "./FileMessageLeftSide";
import FileMessageRightSide from "./FileMessageRightSide";
import { useSelector } from "react-redux";

const MessageContainer = ({ listChat }) => {
  const user = useSelector((state) => state.auth.userInfo);
  const [openMenuId, setOpenMenuId] = useState(null);
  const refDiv = useRef(null);
  const toggleMenu = (idx) => {
    if (openMenuId === idx) {
      setOpenMenuId(null); // Đóng menu nếu nó đang mở
    } else {
      setOpenMenuId(idx); // Mở menu của mục này
    }
  };

  const scrollToLastMessage = () => {
    const lastChildElement = refDiv.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [listChat]);

  return (
    <div
      ref={refDiv}
      className="flex-1 relative w-full overflow-y-hidden custom-scrollbar hover:overflow-y-auto focus:overflow-y-auto"
    >
      {listChat?.map((item, idx) => {
        if (item.senderId === user.info.id || item.sender.id === user.info.id) {
          if (item.messageType === "TEXT")
            return (
              <TextMessageRightSide
                item={item}
                key={idx}
                index={idx}
                toggleMenu={toggleMenu}
                openMenuId={openMenuId}
              />
            );
          else return <FileMessageRightSide item={item} key={idx} />;
        } else {
          if (item.messageType === "TEXT")
            return (
              <TextMessageLeftSide
                item={item}
                key={idx}
                index={idx}
                toggleMenu={toggleMenu}
                openMenuId={openMenuId}
              />
            );
          else return <FileMessageLeftSide item={item} key={idx} />;
        }
      })}
    </div>
  );
};

export default MessageContainer;
