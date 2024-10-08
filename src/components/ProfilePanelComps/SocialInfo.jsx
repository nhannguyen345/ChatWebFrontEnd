import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const SocialInfo = ({ userInfo }) => {
  const SocialItem = ({ label, account, link, icon: Icon }) => (
    <li className="flex items-center border-b border-[#e5e9f2] py-3 px-5 bg-white">
      <div className="flex-1 flex flex-col">
        <p className="text-xs leading-normal text-[#adb5bd]">{label}</p>
        <a
          href={link ? link : "#"}
          className="text-sm leading-normal font-medium text-[#665dfe] no-underline"
        >
          {account}
        </a>
      </div>
      <Icon className="h-5 w-5 text-[#adb5bd]" />
    </li>
  );

  return (
    <div className="bg-white my-6 border rounded">
      <ul className="w-full rounded-t list-none">
        <SocialItem
          label="Facebook"
          account="@Facebook Account"
          link={userInfo?.fbLink}
          icon={FiFacebook}
        />
        <SocialItem
          label="Twitter"
          account="@Twitter Account"
          link={userInfo?.twitterLink}
          icon={FiTwitter}
        />
        <SocialItem
          label="Instagram"
          account="@Instagram Account"
          link={userInfo?.instaLink}
          icon={FiInstagram}
        />
      </ul>
    </div>
  );
};

export default SocialInfo;
