import { useDispatch, useSelector } from "react-redux";
import { setPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";
import { formatDistanceToNow } from "date-fns";
import { ImSpinner } from "react-icons/im";
import { setSelectedConversationId } from "../../features/message/messageSlice";

const ListChat = ({ selectedFilter, searchString }) => {
  const dispatch = useDispatch();
  const { selectedConversationId, listMess, status, error } = useSelector(
    (state) => state.message
  );
  const { onlineFriends } = useSelector((state) => state.connectionStatus);
  // const panelVisibility = useSelector((state) => state.panelVisibility);

  const filteredList = listMess.filter((conve) => {
    const matchesFilter =
      selectedFilter.type === 1 ||
      (selectedFilter.type === 2 && conve.type === "friend") ||
      (selectedFilter.type === 3 && conve.type === "group");

    const matchesSearch =
      searchString === "" ||
      conve.entity?.username?.includes(searchString) ||
      conve.entity?.name?.includes(searchString);

    return matchesFilter && matchesSearch;
  });

  const timeAgo = (date) => {
    const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
    if (distance.includes("less than a minute ago")) {
      return "just now";
    }
    return distance;
  };

  return (
    <div className="flex-grow py-3 px-4 overflow-y-scroll no-scrollbar max-sm:mb-[60px]">
      {(status == "idle" || status == "loading") && (
        <div className="flex w-full h-full justify-center items-center">
          <ImSpinner className="animate-spin h-[36px] w-[36px]" />
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error.message}</div>}
      {status === "succeeded" &&
        !error &&
        filteredList.map((item, idx) => (
          <div
            key={idx}
            className={
              "py-4 my-3 w-full flex flex-row overflow-hidden justify-evenly border rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 cursor-pointer " +
              (selectedConversationId === item.entity.id + "_" + item.type
                ? "bg-[#665dfe]"
                : "bg-[#fff]")
            }
            onClick={() => {
              dispatch(setPanelVisibility(true));
              dispatch(
                setSelectedConversationId(item.entity.id + "_" + item.type)
              );
            }}
          >
            {/* Avatar */}
            <div className="relative z-0">
              <img
                className="h-[52px] w-[52px] shadow object-cover rounded-full"
                src={item.entity.avatarUrl}
                alt=""
              />
              <span
                className={
                  "absolute bottom-0 right-1 text-center h-3 w-3 p-px rounded-full text-[10px] font-bold " +
                  (onlineFriends.includes(item.entity.username)
                    ? "bg-green-500"
                    : "bg-gray-300")
                }
              ></span>
            </div>

            {/* Name & lastMessgae */}
            <div className="w-9/12 flex flex-col gap-1 overflow-hidden">
              <div className="flex justify-between">
                <h4
                  className={
                    "font-semibold text-base " +
                    (selectedConversationId === item.entity.id + "_" + item.type
                      ? "text-[#fff]"
                      : "")
                  }
                >
                  {item?.entity?.username
                    ? item.entity.username
                    : item.entity.name}
                </h4>
                <span
                  className={
                    "text-sm " +
                    (selectedConversationId === item.entity.id + "_" + item.type
                      ? "text-[#fff]"
                      : "text-[#adb5bd]")
                  }
                >
                  {item?.lastMessageTime ? timeAgo(item.lastMessageTime) : null}
                </span>
              </div>
              <p
                className={
                  "w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-sm " +
                  (selectedConversationId === item.entity.id + "_" + item.type
                    ? "text-[#fff]"
                    : "text-[#adb5bd]")
                }
              >
                {item?.messages?.at(-1)?.content
                  ? item.messages.at(-1).content
                  : "( Start chatting with your friend )"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListChat;
