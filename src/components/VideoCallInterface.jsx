import React, { useEffect, useRef, useState } from "react";
import { FiMic } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiPhoneOff } from "react-icons/fi";
import { FiVideoOff } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useStompClient } from "react-stomp-hooks";

const VideoCallInterface = ({
  myVideoStream,
  userVideoStream,
  callAccepted,
  callEnded,
  call,
  handleTurnOffPhone,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const myVideoRef = useRef();
  const userVideoRef = useRef();

  const stompClient = useStompClient();
  const subscriptionEndTheCallRef = useRef();
  const startDate = useRef(null);

  useEffect(() => {
    if (userVideoRef.current) {
      startDate.current = Date.now();
      const time = setInterval(() => {
        timeDiff(startDate.current);
      }, 1000);
      return () => clearInterval(time);
    }
  }, [userVideoRef.current]);

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = myVideoStream;
      if (stompClient) {
        subscriptionEndTheCallRef.current = stompClient.subscribe(
          `/user/${user.info.username}/queue/ended-call`,
          (message) => {
            handleTurnOffPhone(new Date(startDate.current));
          }
        );
      }
    }

    return () => subscriptionEndTheCallRef.current?.unsubscribe();
  }, [myVideoStream]);

  useEffect(() => {
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = userVideoStream;
    }
  }, [userVideoStream]);

  const toggleMic = (status) => {
    const mic = myVideoStream
      .getTracks()
      .find((track) => track.kind === "audio");
    mic.enabled = status;
  };

  const toggleVideo = (status) => {
    const video = myVideoStream
      .getTracks()
      .find((track) => track.kind === "video");
    video.enabled = status;
  };

  // Timer for call beginning
  const timeDiff = (startDate) => {
    const time = Date.now() - startDate;

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const displayTimer = () => {
    return (
      <div className="text-center my-2">
        <span>{hours < 10 ? "0" + hours : hours}</span>
        <span>:</span>
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <span>:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl p-4">
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
        {userVideoRef.current ? displayTimer() : null}
        <div className="flex space-x-4 mb-4">
          {/* Your video */}
          {myVideoStream && (
            <div className="flex-1 relative bg-gray-600 rounded-lg overflow-hidden aspect-video">
              <video
                playsInline
                ref={myVideoRef}
                autoPlay
                className="min-w-[300px]"
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
          )}

          {/* Other person's video */}
          {callAccepted && !callEnded ? (
            <div className="flex-1 relative bg-gray-600 rounded-lg overflow-hidden aspect-video">
              <video
                playsInline
                ref={userVideoRef}
                autoPlay
                className="min-w-[300px]"
              />

              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded-full text-white text-sm">
                {call.toUsername !== user.info.username
                  ? call.toUsername
                  : call.fromUsername}
              </div>
            </div>
          ) : null}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              toggleMic(!isMuted);
              setIsMuted(!isMuted);
            }}
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
            onClick={() => {
              toggleVideo(isVideoOff);
              setIsVideoOff(!isVideoOff);
            }}
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
              onClick={() => {
                handleTurnOffPhone(new Date(startDate.current));
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallInterface;
