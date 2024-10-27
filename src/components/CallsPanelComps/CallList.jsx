import React from "react";
import CallItem from "./CallItem";
import { useSelector } from "react-redux";
import { ImSpinner } from "react-icons/im";

const CallList = ({ searchString, callData, loading, error }) => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div className="flex-grow py-3 px-4 overflow-y-scroll no-scrollbar">
      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <ImSpinner className="animate-spin h-[36px] w-[36px]" />
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {callData &&
        !loading &&
        !error &&
        callData
          .filter((call) => {
            if (searchString === "") return true;
            let name =
              call.caller.username === user.info.username
                ? call.receiver.username
                : call.caller.username;
            return name.includes(searchString);
          })
          .map((call) => <CallItem key={call.id} call={call} user={user} />)}
    </div>
  );
};

export default CallList;
