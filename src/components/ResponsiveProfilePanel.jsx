import React from "react";
import ProfileSettingContent from "./MainContentPanelComps/ProfileSettingContent";
import ProfilePanel from "./leftPanelViews/ProfilePanel";
import { useSelector } from "react-redux";

const ResponsiveProfilePanel = () => {
  const profilePanelStatus = useSelector(
    (state) => state.panelVisibility.activeProfileMainPanel
  );
  return (
    <div className="w-full h-full">
      {/* Profile Panel */}
      <div
        className={`w-full h-full ${
          profilePanelStatus ? "max-sm:animate-hidden-page max-sm:absolute" : ""
        } sm:animate-none`}
      >
        <ProfilePanel />
      </div>

      {/* Profile Content */}
      <div
        className={`flex flex-1 h-full ${
          profilePanelStatus
            ? "max-sm:animate-slide-left"
            : "max-sm:animate-slide-right"
        } sm:hidden`}
      >
        <ProfileSettingContent />
      </div>
    </div>
  );
};

export default ResponsiveProfilePanel;
