import { useSelector } from "react-redux";
import { StompSessionProvider } from "react-stomp-hooks";
// eslint-disable-next-line react/prop-types
const WebSocketProvider = ({ children }) => {
  //   const user = useSelector((state) => state.auth.userInfo);
  return (
    <StompSessionProvider
      url="ws://localhost:8080/chat-web-websocket"
      onConnect={() => console.log("Connected to Websocket server")}
      onDisconnect={() => console.log("Disconnected from Websocket server")}
      //   connectHeaders={{ username: user.username }}
    >
      {children}
    </StompSessionProvider>
  );
};

export default WebSocketProvider;
