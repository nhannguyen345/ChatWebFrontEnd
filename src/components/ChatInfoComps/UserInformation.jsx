import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
const UserInformation = () => {
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
              20/11/1992
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Phone</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              09937473784
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Email</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              nhandzzkkk@gmail.com
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Address</p>
            <p className="text-[14px] italic leading-[1.5] text-[#495057]">
              1134 Ridder Park Road, San Fransisco, CA 94851
            </p>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Facebook</p>
            <a
              className="text-[14px] italic leading-[1.5] text-[#665dfe] no-underline"
              href="#"
            >
              @Facebook Account
            </a>
          </div>
        </li>
        <li className="flex items-center py-2 bg-[#fff]">
          <div className="flex-1 flex flex-col">
            <p className="text-[13px] leading-[1.5] text-[#adb5bd]">Twitter</p>
            <a
              className="text-[14px] italic leading-[1.5] text-[#665dfe] no-underline"
              href="#"
            >
              @Twitter Account
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
              href="#"
            >
              @Instagram Account
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserInformation;
