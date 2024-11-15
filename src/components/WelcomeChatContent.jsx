import { useSelector } from "react-redux";

const WelcomeChatContent = () => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img
        className="h-[74px] w-[74px] shadow object-cover rounded-full mb-3"
        src={user.info.avatarUrl}
        alt=""
      />
      <h4 className="text-[20px] font-[500] text-[#495057] mb-3">
        Welcome, {user.info.username}!
      </h4>
      <h5 className="text-[#adb5bd] mb-4">
        Please select a chat to Start messaging.
      </h5>
      <button className="border border-[#665dfe] text-[#665dfe] text-[16px] text-center align-middle py-[7px] px-[20px] rounded-md hover:text-white hover:bg-[#665dfe]">
        Start a conversation
      </button>
    </div>
  );
};

export default WelcomeChatContent;
