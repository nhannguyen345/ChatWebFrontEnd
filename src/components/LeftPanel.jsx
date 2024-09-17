import { useDispatch, useSelector } from "react-redux";
// import { setShowChat } from "../features/showchat/showchatSlice";
import ChatsPanel from "./LeftPanelViews/ChatsPanel";
import ProfilePanel from "./LeftPanelViews/ProfilePanel";
import ContactsPanel from "./LeftPanelViews/ContactsPanel";
import CallsPanel from "./LeftPanelViews/CallsPanel";
// import HeaderOfLeftBar from "./HeaderOfLeftBar";
// import ResponsiveMenu from "./ResponsiveMenu";

const LeftPanel = () => {
  const panelVisibility = useSelector((state) => state.panelVisibility);
  const menu = useSelector((state) => state.menu.activeTab);

  return (
    <div
      className={
        "flex flex-row max-w-[600px] min-w-[400px] h-screen border-r max-sm:w-screen" +
        (panelVisibility
          ? " max-sm:absolute max-sm:left-0 max-sm:animate-hidden-page"
          : " ")
      }
    >
      {/* <button
        className="border-2 hover:cursor-pointer h-[40px] w-[120px] mt-3"
        onClick={() => dispatch(setShowChat(!showChat))}
      >
        Show main chat
      </button> */}
      {/* <HeaderOfLeftBar /> */}
      {menu === "profile" && <ProfilePanel />}
      {menu === "chats" && <ChatsPanel />}
      {menu === "contacts" && <ContactsPanel />}
      {menu === "calls" && <CallsPanel />}
    </div>
  );
};

export default LeftPanel;
