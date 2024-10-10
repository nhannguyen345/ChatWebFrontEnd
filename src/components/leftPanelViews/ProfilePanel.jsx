import React from "react";
import ProfileHeader from "../ProfilePanelComps/ProfileHeader";
import Avatar from "../ProfilePanelComps/Avatar";
import PersonalInfo from "../ProfilePanelComps/PersonalInfo";
import SocialInfo from "../ProfilePanelComps/SocialInfo";
import { useSelector } from "react-redux";

const ProfilePanel = () => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div className="max-w-md w-full flex flex-col bg-[#f8f9fa] shadow-lg rounded-lg">
      <ProfileHeader />
      <div className="flex-grow divide-gray-200 overflow-y-scroll no-scrollbar px-4">
        <Avatar avataUrl={user?.info?.avatarUrl} />
        <PersonalInfo userInfo={user?.info} />
        <SocialInfo userInfo={user?.info} />
      </div>
    </div>
  );
};

export default ProfilePanel;
