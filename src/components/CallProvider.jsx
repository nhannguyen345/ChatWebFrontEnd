import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallAccepted } from "../features/call/callSlice";
import { useStompClient } from "react-stomp-hooks";
import Peer from "simple-peer";
import IncomingCall from "./IncomingCall";
import VideoCallInterface from "./VideoCallInterface";

const CallProvider = () => {
  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { startingCall, call, callAccepted, callEnded, receivingCall } =
    useSelector((state) => state.call);

  const [stream, setStream] = useState();
  const [myVideoStream, setMyVideoStream] = useState();
  const [userVideoStream, setUserVideoStream] = useState();

  // const myVideoRef = useRef();
  // const userVideoRef = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (startingCall?.userId || callAccepted) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setMyVideoStream(currentStream);
        });
    }

    return () => {};
  }, [dispatch, startingCall, callAccepted]);

  useEffect(() => {
    if (startingCall?.userId) {
      console.log(startingCall?.userId);
      callUser(startingCall?.userId);
    } else if (callAccepted) {
      console.log(callAccepted);
      answerCall();
    }
  }, [callAccepted, startingCall]);

  useEffect(() => {
    console.log("callEnded:", callEnded);
    if (callEnded) {
      leaveCall();
    }
  }, [callEnded]);

  // *call function
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myVideoStream,
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
      // if (userVideoRef.current) {
      //   userVideoRef.current.srcObject = stream;
      // }
      setUserVideoStream(stream);
    });

    stompClient.subscribe(
      `/user/${user.info.username}/queue/answer-call`,
      (message) => {
        dispatch(setCallAccepted(true));
        peer.signal(JSON.parse(message.body));
      }
    );

    connectionRef.current = peer;
  };

  // *answer function
  const answerCall = () => {
    console.log("answerCall has called!");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myVideoStream,
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
  };

  const leaveCall = () => {
    console.log(myVideoStream);
    if (myVideoStream) {
      console.log("Stopping tracks...");
      myVideoStream.getTracks().forEach((track) => {
        console.log("Stopping track:", track);
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
      {startingCall?.userId && (
        <VideoCallInterface
          myVideoStream={myVideoStream}
          userVideoStream={userVideoStream}
          callAccepted={callAccepted}
          callEnded={callEnded}
          call={call}
          stream={stream}
        ></VideoCallInterface>
      )}
      {receivingCall && <IncomingCall call={call}></IncomingCall>}
    </div>
  );
};

export default CallProvider;
