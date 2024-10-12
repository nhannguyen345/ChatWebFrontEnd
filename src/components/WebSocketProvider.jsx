import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StompSessionProvider, useStompClient } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";
import { setSessionSocketId } from "../features/auth/authSlice";
// eslint-disable-next-line react/prop-types
const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [connectionError, setConnectionError] = useState(false);
  // const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    if (connectionError) {
      toast.error("You need to login again!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [connectionError]);

  return (
    <StompSessionProvider
      url="ws://localhost:8080/chat-web-websocket"
      onConnect={(frame) => {
        console.log("Connected to Websocket server");
        // Lấy sessionId từ frame nếu có
        console.log(frame);
      }}
      onDisconnect={() => console.log("Disconnected from Websocket server")}
      connectHeaders={{ "WS-Authorization": `Bearer ${jwt}` }}
      onStompError={(error) => {
        console.error("WebSocket error: ", error);
        setConnectionError(true);
      }}
    >
      {children}
      <ToastContainer position="top-center" />
    </StompSessionProvider>
  );
};

export default WebSocketProvider;
