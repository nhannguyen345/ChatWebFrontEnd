import React from "react";
import { FiPhone, FiPhoneOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setCallAccepted, setReceivingCall } from "../features/call/callSlice";

const IncomingCall = ({ call }) => {
  const dispatch = useDispatch();
  const { listMess } = useSelector((state) => state.message);
  const getAvatarUrlUserCall = () => {
    return listMess.find((conv) => {
      return conv.entity.username === call.fromUsername;
    })?.entity?.avatarUrl;
  };
  const handleClickCall = () => {
    dispatch(setReceivingCall(false));
    dispatch(setCallAccepted(true));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white min-w-[340px] rounded-lg shadow-lg p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Incoming Call</h2>
        <p className="text-gray-600">You have an incoming video call...</p>
        <div className="flex flex-col items-center">
          <img
            src={getAvatarUrlUserCall()}
            alt={"avatar"}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            {call.fromUsername}
          </h2>
        </div>
        <div className="flex justify-center space-x-10 pt-4">
          <button
            onClick={null}
            className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            <FiPhoneOff size={24} className="text-white" />
          </button>
          <button
            onClick={null}
            className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
          >
            <FiPhone
              size={24}
              className="text-white"
              onClick={handleClickCall}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
