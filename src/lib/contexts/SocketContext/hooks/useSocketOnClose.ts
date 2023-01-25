/**
 * The following custom hook allows us to attach a
 * callback to the onClose event
 */
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";

/**
 * Similar to the above only it is called when the socket is closed
 * @param callback 
 **/
export const useSocketOnClose = (callback: any) => {
  const socket: WebSocket = useContext<WebSocket>(SocketContext);
  const onClose = useCallback(callback, []);

  useEffect(() => {
    socket.addEventListener("close", onClose);

    return () => {
      socket.removeEventListener("close", onClose);
    };
  }, [socket, onClose]);
}