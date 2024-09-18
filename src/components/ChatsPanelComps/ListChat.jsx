import { useDispatch, useSelector } from "react-redux";
import { setPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";

const chats = [
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage:
      "Hello, you look handsome Hello, you look handsome Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
  {
    avatarUrl:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    username: "Martin Helen",
    time: "Just now",
    lastMessage: "Hello, you look handsome",
  },
];
const ListChat = () => {
  const dispatch = useDispatch();
  const panelVisibility = useSelector((state) => state.panelVisibility);
  return (
    <div className="flex-grow py-3 px-4 overflow-y-scroll no-scrollbar max-sm:mb-[60px]">
      {chats.map((item, idx) => (
        <div
          key={idx}
          className="py-4 my-3 w-full flex flex-row overflow-hidden justify-evenly border bg-[#fff] rounded-sm shadow-sm transition-all duration-300 ease-in-out hover:border-[#665dfe] cursor-pointer"
          onClick={() => dispatch(setPanelVisibility(true))}
        >
          {/* Avatar */}
          <div>
            <img
              className="h-[52px] w-[52px] shadow object-cover rounded-full"
              src={item.avatarUrl}
              alt=""
            />
          </div>

          {/* Name & lastMessgae */}
          <div className="w-9/12 flex flex-col gap-1 overflow-hidden">
            <div className="flex justify-between">
              <h4 className="font-semibold text-sm">{item.username}</h4>
              <span className="text-sm text-[#adb5bd]">{item.time}</span>
            </div>
            <p className="w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-[#adb5bd]">
              {item.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListChat;
