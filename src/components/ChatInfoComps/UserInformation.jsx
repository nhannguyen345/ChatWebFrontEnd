import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
const UserInformation = ({ userInfo }) => {
  return (
    <div className="px-7 py-3">
      <div className="flex justify-between items-center">
        <h6 className="text-[16px] text-[#495057] font-medium">
          User Information
        </h6>
        <IoIosInformationCircleOutline className="h-[22px] w-[22px] text-[#adb5bd]" />
      </div>
      <ul className="w-full rounded-t-[4px] mt-4 list-none">
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">
              Birthdate
            </p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              {userInfo?.birthdate ? userInfo.birthdate : "No infomation"}
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Phone</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              {userInfo?.phone ? userInfo.phone : "No infomation"}
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Email</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              {userInfo?.email}
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Address</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              {userInfo?.address ? userInfo.address : "No infomation"}
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Facebook</p>
            <a
              className="text-[14px] italic leading-[1.5] text-[#665dfe] no-underline"
              href={userInfo?.fbLink ? userInfo.fbLink : "#"}
            >
              {userInfo?.fbLink ? "@Facebook Account" : "No infomation"}
            </a>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Twitter</p>
            <a
              className="text-[14px] italic leading-[1.5] text-[#665dfe] no-underline"
              href={userInfo?.twitterLink ? userInfo.twitterLink : "#"}
            >
              {userInfo?.twitterLink ? "@Twitter Account" : "No infomation"}
            </a>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">
              Instagram
            </p>
            <a
              className="text-[14px] italic leading-[1.5] text-[#665dfe] no-underline"
              href={userInfo?.instaLink ? userInfo.instaLink : "#"}
            >
              {userInfo?.instaLink ? "@Instagram Account" : "No infomation"}
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserInformation;
