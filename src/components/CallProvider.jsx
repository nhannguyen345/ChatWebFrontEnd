import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCallState,
  setCall,
  setCallAccepted,
  setReceivingCall,
} from "../features/call/callSlice";
import { useStompClient } from "react-stomp-hooks";
import Peer from "simple-peer";
import IncomingCall from "./IncomingCall";
import VideoCallInterface from "./VideoCallInterface";
import { toast, ToastContainer } from "react-toastify";

const CallProvider = () => {
  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const {
    isCaller,
    startingCall,
    call,
    callAccepted,
    callEnded,
    receivingCall,
  } = useSelector((state) => state.call);

  const [myVideoStream, setMyVideoStream] = useState();
  const [userVideoStream, setUserVideoStream] = useState();

  const connectionRef = useRef();
  const subscriptionDeclineTheCallRef = useRef();

  useEffect(() => {
    if (startingCall?.userId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setMyVideoStream(currentStream);
          callUser(startingCall?.userId, currentStream);

          if (stompClient) {
            subscriptionDeclineTheCallRef.current = stompClient.subscribe(
              `/user/${user.info.username}/queue/call-declined`,
              (message) => {
                if (connectionRef.current) {
                  toast.info(message.body, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    containerId: "decline-call-toast",
                  });
                  currentStream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  connectionRef.current.destroy();
                  setTimeout(() => dispatch(resetCallState()), 500);
                }
              }
            );
          }
        });
    }

    return () => {
      subscriptionDeclineTheCallRef.current?.unsubscribe();
    };
  }, [dispatch, startingCall]);

  useEffect(() => {
    if (startingCall?.userId) {
      console.log(startingCall?.userId);
    }
  }, [startingCall]);

  const handleAnswerCall = async () => {
    try {
      dispatch(setReceivingCall(false));
      dispatch(setCallAccepted(true));
      await answerCall();
    } catch (error) {
      console.error("Error while answering call:", error);
    }
  };

  const handleTurnOffPhone = () => {
    leaveCall();
    dispatch(resetCallState());
  };

  // useEffect(() => {
  //   console.log("callEnded:", callEnded);
  //   if (callEnded) {
  //     leaveCall();
  //   }
  // }, [callEnded]);

  // *call function
  const callUser = (id, currentStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: currentStream,
    });

    peer.on("signal", (data) => {
      stompClient.publish({
        destination: "/app/call-user",
        body: JSON.stringify({
          fromUsername: user.info.username,
          toUsername: id,
          signalData: data,
        }),
      });
    });

    peer.on("stream", (stream) => {
      setUserVideoStream(stream);
    });

    stompClient.subscribe(
      `/user/${user.info.username}/queue/accept-call`,
      (message) => {
        dispatch(setCallAccepted(true));
        dispatch(setCall(JSON.parse(message.body)));
        peer.signal(JSON.parse(message.body).signalData);
      }
    );

    connectionRef.current = peer;
  };

  // *answer function
  const answerCall = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyVideoStream(stream);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (data) => {
          stompClient.publish({
            destination: "/app/answer-call",
            body: JSON.stringify({
              fromUsername: call.fromUsername,
              toUsername: call.toUsername,
              signalData: data,
            }),
          });
        });

        peer.on("stream", (stream) => {
          setUserVideoStream(stream);
        });
        peer.signal(call.signalData);
        connectionRef.current = peer;
      })
      .catch((err) => console.log(err));
    console.log("answerCall has called!");
  };

  const leaveCall = () => {
    console.log(myVideoStream);
    if (myVideoStream) {
      console.log("Stopping tracks...");
      const videoTrack = myVideoStream
        .getTracks()
        .find((track) => track.kind === "video");
      videoTrack.enable = false;
      const audioTrack = myVideoStream
        .getTracks()
        .find((track) => track.kind === "audio");
      audioTrack.enable = false;
    }

    if (connectionRef.current) {
      console.log("Destroying connection...");
      connectionRef.current.destroy();
    }
  };
  return (
    <div>
      {(startingCall?.userId || (callAccepted && !isCaller)) && (
        <VideoCallInterface
          myVideoStream={myVideoStream}
          userVideoStream={userVideoStream}
          callAccepted={callAccepted}
          callEnded={callEnded}
          call={call}
          handleTurnOffPhone={handleTurnOffPhone}
        ></VideoCallInterface>
      )}
      {receivingCall && (
        <IncomingCall call={call} onAccept={handleAnswerCall}></IncomingCall>
      )}
      <ToastContainer
        containerId={"decline-call-toast"}
        position="top-center"
      />
    </div>
  );
};

export default CallProvider;
