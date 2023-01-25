/**
 * The following custom hook allows us to attach a
 * callback to the onMessage event
 */
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
/**
 * The following is called when a message is received
 * Simply pass a callback and that callback will run
 * every time a message is received
 * @param callback 
 */
export const useSocketOnMessage = (callback: any) => {
  const socket: WebSocket = useContext<WebSocket>(SocketContext);
  const onMessage = useCallback(callback, []);

  useEffect(() => {
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket, onMessage]);
}