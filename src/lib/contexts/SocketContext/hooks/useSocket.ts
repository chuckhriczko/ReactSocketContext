/**
 * The following custom hook will return the WebSocket object
 * This object is shared throughout the app thanks to the context
 */
import { useContext } from "react";
import { SocketContext } from "../SocketContext";

/**
 * This will simply return the WebSocket object
 */
export const useSocket = () => useContext<WebSocket>(SocketContext);