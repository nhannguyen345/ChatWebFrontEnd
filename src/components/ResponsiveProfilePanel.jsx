import React from "react";
import ProfileSettingContent from "./MainContentPanelComps/ProfileSettingContent";
import ProfilePanel from "./leftPanelViews/ProfilePanel";

const ResponsiveProfilePanel = () => {
  const profilePanelStatus = useSelector(
    (state) => state.panelVisibility.activeProfileMainPanel
  );
  return (
    <div className="w-full h-full">
      {/* Chats Panel */}
      <div
        className={`w-full h-full ${
          profilePanelStatus ? "animate-slide-left" : "animate-hidden-page"
        } sm:animate-none`}
      >
        <ProfilePanel />
      </div>

      {/* Chat Content */}
      <div
        className={`flex flex-1 h-full ${
          profilePanelStatus ? "animate-slide-right" : "animate-slide-left"
        } sm:flex`}
      >
        <ProfileSettingContent />
      </div>
    </div>
  );
};

export default ResponsiveProfilePanel;
