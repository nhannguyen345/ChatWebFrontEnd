import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";
// eslint-disable-next-line react/prop-types
const WebSocketProvider = ({ children }) => {
  const [connectionError, setConnectionError] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo) || {
    jwtToken: localStorage.getItem("auth-tk-webchat"),
  };

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
      onConnect={() => console.log("Connected to Websocket server")}
      onDisconnect={() => console.log("Disconnected from Websocket server")}
      connectHeaders={{ "WS-Authorization": `Bearer ${user.jwtToken}` }}
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
