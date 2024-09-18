import React, { useEffect, useRef, useState } from "react";
import TextMessageRightSide from "./TextMessageRightSide";
import TextMessageLeftSide from "./TextMessageLeftSide";
import FileMessageLeftSide from "./FileMessageLeftSide";
import FileMessageRightSide from "./FileMessageRightSide";
const ListMessage = [
  {
    messId: 1,
    senderId: "1",
    receiverId: "2",
    contentType: "text",
    content:
      "I have to give a presentation on global warming on Friday, and I am so nervous.",
    urlFile: "",
    sendAt: "9:12am",
  },
  {
    messId: 2,
    senderId: "2",
    receiverId: "1",
    contentType: "text",
    content:
      "First of all, you need to understand the subject matter thoroughly. You need to know what is global warming, what causes global warming, and what people should do to abate the effects of global warming.",
    urlFile: "",
    sendAt: "9:12am",
  },
  {
    messId: 3,
    senderId: "2",
    receiverId: "1",
    contentType: "text",
    content:
      "I have done a lot of research on the subject, and I know I can answer any questions I will receive from the audience.",
    urlFile: "",
    sendAt: "9:12am",
  },
  {
    messId: 4,
    senderId: "1",
    receiverId: "2",
    contentType: "text",
    content: "Yes, what you should present first, second and third…",
    urlFile: "",
    sendAt: "9:12am",
  },
  {
    messId: 5,
    senderId: "1",
    receiverId: "2",
    contentType: "file",
    content: "baitaphoa.xlsx-345.23",
    urlFile: "http://...",
    sendAt: "9:12am",
  },
  {
    messId: 6,
    senderId: "2",
    receiverId: "1",
    contentType: "text",
    content:
      "If that is the case, then I already have an outline. To make it easy for my audience to follow the presentation, I intend to post the outline on the board at all time during my speech.",
    urlFile: "",
    sendAt: "9:12am",
  },
  {
    messId: 7,
    senderId: "1",
    receiverId: "2",
    contentType: "image",
    content: "baitap.png-543,64",
    urlFile:
      "https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg",
    sendAt: "9:12am",
  },
];
const MessageContainer = ({ listChat }) => {
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
      className="flex-1 w-full overflow-y-hidden custom-scrollbar hover:overflow-y-auto focus:overflow-y-auto"
    >
      {listChat.map((item, idx) => {
        if (item.senderId === "1") {
          if (item.contentType === "text")
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
          if (item.contentType === "text")
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
