import React from "react";
import { BsTelephone } from "react-icons/bs";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
  BsFillTelephoneXFill,
  BsFillTelephoneMinusFill,
} from "react-icons/bs";

const CallItem = ({ call, user }) => {
  var info =
    call.caller.username === user.info.username ? call.receiver : call.caller;

  const timeAgo = (date) => {
    const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
    if (distance.includes("less than a minute ago")) {
      return "just now";
    }
    return distance;
  };

  const displayIconCall = (callInfo) => {
    if (callInfo?.caller.username === user.info.username) {
      return (
        <p className={`mt-1 text-xs text-gray-500`}>
          <span className="inline-block mr-1">
            <BsFillTelephoneOutboundFill />
          </span>
          {timeAgo(call.endedAt)}
        </p>
      );
    } else if (
      callInfo?.receiver.username === user.info.username &&
      callInfo?.callStatus === "COMPLETED"
    ) {
      return (
        <p className={`mt-1 text-xs text-gray-500`}>
          <span className="inline-block mr-1">
            <BsFillTelephoneInboundFill />
          </span>
          {timeAgo(call.endedAt)}
        </p>
      );
    } else if (
      callInfo?.callStatus === "MISSED" &&
      callInfo?.receiver.username === user.info.username
    ) {
      return (
        <p className={`mt-1 text-xs text-red-500`}>
          <span className="inline-block mr-1">
            <BsFillTelephoneXFill />
          </span>
          {timeAgo(call.endedAt)}
        </p>
      );
    } else if (
      callInfo?.callStatus === "DECLINED" &&
      callInfo?.receiver.username === user.info.username
    ) {
      return (
        <p className={`mt-1 text-xs text-red-500`}>
          <span className="inline-block mr-1">
            <BsFillTelephoneMinusFill />
          </span>
          {timeAgo(call.endedAt)}
        </p>
      );
    }
  };
  return (
    <div className="flex items-center p-4 my-3 hover:bg-gray-100 border">
      <div className="mr-3 flex-shrink-0">
        <img
          src={info?.avatar}
          alt={info?.username}
          className="w-[52px] h-[52px] rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-sm mb-1">{info?.username}</h3>
        {displayIconCall(call)}
      </div>
      <BsTelephone className="text-gray-400 w-5 h-5" />
    </div>
  );
};

export default CallItem;
