import React from "react";
import CallItem from "./CallItem";

const CallList = ({ callData }) => {
  return (
    <div className="max-w-md w-full rounded-lg py-3 px-4">
      {callData.map((call) => (
        <CallItem key={call.id} call={call} />
      ))}
    </div>
  );
};

export default CallList;
