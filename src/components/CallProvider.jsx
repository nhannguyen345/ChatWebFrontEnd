import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCall, setStream } from "../features/call/callSlice";
import { useStompClient } from "react-stomp-hooks";

const CallProvider = ({ children }) => {
  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { stream, call, callAccepted, callEnded, receivingCall } = useSelector(
    (state) => state.call
  );

  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const connectionRef = useRef();
  const subscribeCallReceiveCallRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        dispatch(setStream(currentStream));
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = currentStream;
        }
      });

    if (stompClient) {
      subscribeCallReceiveCallRef.current = stompClient.subscribe(
        `/user/${user.info.username}/queue/receive-call`,
        (message) => {
          console.log(message.body);
          dispatch(setCall(JSON.parse(message.body)));
        }
      );
    }

    return () => {
      subscribeCallReceiveCallRef?.current?.unsubscribe();
    };
  }, [myVideoRef, dispatch]);
  return <div>{children}</div>;
};

export default CallProvider;
