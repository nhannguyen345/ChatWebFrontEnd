import { useDispatch, useSelector } from "react-redux";
import ProfilePanel from "./leftPanelViews/ProfilePanel";
import ContactsPanel from "./leftPanelViews/ContactsPanel";
import CallsPanel from "./leftPanelViews/CallsPanel";
import ChatsPanel from "./leftPanelViews/ChatsPanel";
import ResponsiveChatsPanel from "./ResponsiveChatsPanel";
import ResponsiveProfilePanel from "./ResponsiveProfilePanel";
// import { setShowChat } from "../features/showchat/showchatSlice";

// import HeaderOfLeftBar from "./HeaderOfLeftBar";
// import ResponsiveMenu from "./ResponsiveMenu";

const LeftPanel = () => {
  const panelVisibility = useSelector((state) => state.panelVisibility);
  const menu = useSelector((state) => state.menu.activeTab);

  return (
    <div
      className={
        "flex flex-row max-w-[600px] min-w-[375px] h-screen border-r max-sm:w-screen "
        // (panelVisibility
        //   ? " max-sm:absolute max-sm:left-0 max-sm:animate-hidden-page"
        //   : " ")
      }
    >
      {/* {menu === "profile" && <ProfilePanel />} */}
      {menu === "profile" && <ResponsiveProfilePanel />}
      {/* {menu === "chats" && <ChatsPanel />} */}
      {menu === "chats" && <ResponsiveChatsPanel />}
      {menu === "contacts" && <ContactsPanel />}
      {menu === "calls" && <CallsPanel />}
    </div>
  );
};

export default LeftPanel;
