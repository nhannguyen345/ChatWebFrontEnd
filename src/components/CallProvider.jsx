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
import axios from "axios";
import { fetchCalls } from "../features/callList/calListAction";

const CallProvider = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
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

  const callTimeOutRef = useRef();

  const connectionRef = useRef();
  const subscriptionDeclineTheCallRef = useRef();

  useEffect(() => {
    if (startingCall?.userId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setMyVideoStream(currentStream);
          callUser(startingCall?.userId, currentStream);

          callTimeOutRef.current = setTimeout(() => {
            handleTimeOut(currentStream);
          }, 30000);

          if (stompClient) {
            subscriptionDeclineTheCallRef.current = stompClient.subscribe(
              `/user/${user.info.username}/queue/call-declined`,
              async (message) => {
                if (connectionRef.current) {
                  toast.info(message.body, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    containerId: "decline-call-toast",
                  });
                  if (callTimeOutRef.current) {
                    clearTimeout(callTimeOutRef.current);
                  }
                  currentStream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  connectionRef.current.destroy();
                  await postDataToServer(
                    startingCall.userId,
                    "DECLINED",
                    new Date().toISOString(),
                    new Date().toISOString()
                  );
                  dispatch(resetCallState());
                  dispatch(fetchCalls());
                }
              }
            );
          }
        });
    }

    return () => {
      subscriptionDeclineTheCallRef.current?.unsubscribe();
      if (callTimeOutRef.current) {
        clearTimeout(callTimeOutRef.current);
      }
    };
  }, [dispatch, startingCall]);

  // useEffect(() => {
  //   if (startingCall?.userId) {
  //     console.log(startingCall?.userId);
  //   }
  // }, [startingCall]);

  //* POST DATA TO SERVER
  const postDataToServer = async (
    receiverUsername,
    callStatus,
    startedAt,
    endedAt
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/call/add-new-call",
        {
          receiverUsername,
          callStatus,
          startedAt,
          endedAt,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
    }
  };

  const handleAnswerCall = async () => {
    try {
      dispatch(setReceivingCall(false));
      dispatch(setCallAccepted(true));
      await answerCall();
    } catch (error) {
      console.error("Error while answering call:", error);
    }
  };

  const handleTurnOffPhone = async (startDate) => {
    leaveCall();
    if (startingCall?.userId && callAccepted) {
      stompClient.publish({
        destination: "/app/call-end",
        body: startingCall.userId,
      });
      await postDataToServer(
        startingCall.userId,
        "COMPLETED",
        startDate.toISOString(),
        new Date().toISOString()
      );
    } else if (callAccepted && !isCaller) {
      stompClient.publish({
        destination: "/app/call-end",
        body: call.fromUsername,
      });
    }
    dispatch(resetCallState());
    setTimeout(() => dispatch(fetchCalls()), 1500);
  };

  //* this function use for cancel call if other user doesn't answer
  const handleTimeOut = async (currentStream) => {
    if (currentStream) {
      toast.info("Receiver doesn't answer!", {
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
      await postDataToServer(
        startingCall.userId,
        "MISSED",
        new Date().toISOString(),
        new Date().toISOString()
      );
      dispatch(resetCallState());
      dispatch(fetchCalls());
    }
  };

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
        clearTimeout(callTimeOutRef.current);
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
      myVideoStream.getTracks().forEach(function (track) {
        track.stop();
      });
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
          postDataToServer={postDataToServer}
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
