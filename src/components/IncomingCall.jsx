import React from "react";
import { FiPhone, FiPhoneOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCallState,
  setCallAccepted,
  setReceivingCall,
  setStartingCall,
} from "../features/call/callSlice";
import { useStompClient } from "react-stomp-hooks";

const IncomingCall = ({ onAccept }) => {
  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { listMess } = useSelector((state) => state.message);
  const { call } = useSelector((state) => state.call);

  const getUserCall = () => {
    return listMess.find((conv) => {
      return conv.entity.username === call.fromUsername;
    })?.entity;
  };

  const handleDeclineCall = async () => {
    stompClient.publish({
      destination: "/app/call-decline",
      body: call.fromUsername,
    });
    dispatch(resetCallState());
    setTimeout(() => dispatch(fetchCalls()), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white min-w-[340px] rounded-lg shadow-lg p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Incoming Call</h2>
        <p className="text-gray-600">You have an incoming video call...</p>
        <div className="flex flex-col items-center">
          <img
            src={getUserCall()?.avatarUrl}
            alt={"avatar"}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            {call.fromUsername}
          </h2>
        </div>
        <div className="flex justify-center space-x-10 pt-4">
          <button
            onClick={handleDeclineCall}
            className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            <FiPhoneOff size={24} className="text-white" />
          </button>
          <button
            onClick={onAccept}
            className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
          >
            <FiPhone size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
