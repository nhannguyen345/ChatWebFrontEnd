import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { MdOutlineCalendarToday, MdOutlineEmail } from "react-icons/md";
import { BsCake } from "react-icons/bs";

const PersonalInfo = ({ userInfo }) => {
  const InfoItem = ({ label, value, icon: Icon }) => (
    <li className="flex items-center border-b border-[#e5e9f2] py-3 px-5 bg-white">
      <div className="flex-1 flex flex-col pr-[10px]">
        <p className="text-xs leading-normal text-[#adb5bd]">{label}</p>
        <p className="text-sm leading-normal text-[#495057]">{value}</p>
      </div>
      <Icon className="h-5 w-5 text-[#adb5bd]" />
    </li>
  );

  return (
    <div className="bg-white mt-6 border rounded">
      <ul className="w-full rounded-t list-none">
        {/* <InfoItem
          label="Birthdate"
          value="20/11/1992"
          icon={MdOutlineCalendarToday}
        /> */}
        <InfoItem label="Birthdate" value={userInfo?.birthdate} icon={BsCake} />
        <InfoItem label="Phone" value={userInfo?.phone} icon={FiPhone} />
        <InfoItem label="Email" value={userInfo?.email} icon={MdOutlineEmail} />
        <InfoItem
          label="Address"
          value={userInfo?.address}
          icon={AiOutlineHome}
        />
      </ul>
    </div>
  );
};

export default PersonalInfo;
