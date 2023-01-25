/**
 * The following custom hook allows us to attach a
 * callback to the onOpen event
 */
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";

/**
 * Thus begins our event hooks.
 * The following hook will be called when the connection is established
 * @param callback 
 */
export const useSocketOnOpen = (callback: any) => {
  const socket: WebSocket = useContext<WebSocket>(SocketContext);
  const onOpen = useCallback(callback, []);

  useEffect(() => {
    socket.addEventListener("open", onOpen);

    return () => {
      socket.removeEventListener("open", onOpen);
    };
  }, [socket, onOpen]);
}