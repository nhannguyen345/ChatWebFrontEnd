import React from "react";
import { BsTelephone } from "react-icons/bs";

const CallItem = ({ call }) => (
  <div className="flex items-center p-4 my-3 hover:bg-gray-100 border">
    <div className="mr-3 flex-shrink-0">
      {call.avatar ? (
        <img
          src={call.avatar}
          alt={call.name}
          className="w-[52px] h-[52px] rounded-full object-cover"
        />
      ) : (
        <div className="w-[52px] h-[52px] rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {call.initials}
        </div>
      )}
    </div>
    <div className="flex-grow">
      <h3 className="font-semibold text-sm mb-1">{call.name}</h3>
      <p
        className={`mt-1 text-xs ${
          call.missed ? "text-red-500" : "text-gray-500"
        }`}
      >
        <span className="inline-block mr-1">{call.missed ? "↙" : "↗"}</span>
        {call.time}
      </p>
    </div>
    <BsTelephone className="text-gray-400 w-5 h-5" />
  </div>
);

export default CallItem;
