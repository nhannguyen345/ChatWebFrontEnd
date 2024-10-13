import React, { useState } from "react";
import { FiMic } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiPhoneOff } from "react-icons/fi";
import { FiVideoOff } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeVideoCallModal } from "../features/modal/modalSlice";
const VideoCallInterface = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl font-semibold">Video Call</h2>
          <button
            onClick={null}
            className="w-fit text-[#adb5bd] hover:text-[#868e96]"
          >
            <IoMdClose
              className="h-[22px] w-[22px] cursor-pointer"
              onClick={() => dispatch(closeVideoCallModal())}
            />
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          {/* Your video */}
          <div className="flex-1 relative bg-gray-600 rounded-lg overflow-hidden aspect-video">
            <img
              src="/api/placeholder/640/360"
              alt="Your video"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded-full text-white text-sm">
              You
            </div>
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
                <FiVideoOff size={48} className="text-white opacity-50" />
              </div>
            )}
          </div>

          {/* Other person's video */}
          <div className="flex-1 relative bg-gray-600 rounded-lg overflow-hidden aspect-video">
            <img
              src="/api/placeholder/640/360"
              alt="Other person's video"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded-full text-white text-sm">
              Other Person
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${
              isMuted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isMuted ? (
              <FiMicOff size={24} className="text-white" />
            ) : (
              <FiMic size={24} className="text-white" />
            )}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full transition-colors ${
              isVideoOff
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isVideoOff ? (
              <FiVideoOff size={24} className="text-white" />
            ) : (
              <FiVideo size={24} className="text-white" />
            )}
          </button>
          <button
            onClick={null}
            className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            <FiPhoneOff
              size={24}
              className="text-white"
              onClick={() => dispatch(closeVideoCallModal())}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallInterface;
