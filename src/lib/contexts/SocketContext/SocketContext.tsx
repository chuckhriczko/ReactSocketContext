import { createContext, useState } from "react";
import ISocketProvider from "./interfaces/ISocketProvider";

//WebSocket URL
let webSocketUrl = 'wss://ws.thedevelopingweb.com';

//WebSocket settings
const reconnectTimeout = 10 * 1000; //10 Seconds

//Reconnect timer
let reconnectTimer: NodeJS.Timeout | null = null;

//This is our WebSocket connection. We will use the context to access this
//specific object.
export let ws = new WebSocket(webSocketUrl);

//WebSocket React Context
export const SocketContext = createContext(ws);

/**
 * This is an event that occurs when the WebSocket connection is established
 * If there are any tasks that need to be performed like getting an access
 * token, this is the place to do it
 */
export const wsOpen = async () => {
  //Openy stuff goes here
}

/**
 * When the socket closes, try to reconnect after a timeout
 * @param e Event
 */
export const wsClose = (e: any) => {
  console.log(`Socket is closed. Reconnect will be attempted in ${reconnectTimeout/1000} seconds.`, e.reason);
  reconnectTimer = setInterval(wsReconnect, reconnectTimeout);

  //Extra closey stuff goes here
}

/**
 * If the WebSocket errors out, try to reconnect after the timeout
 * We are simply routing the error handler to the closer handler
 * @param e 
 */
export const wsError = (e: any) => wsClose(e);

/**
 * Reconnects the WebSocket after a timeout
 * @returns WebSocket | null
 */
export const wsReconnect = () => {
  ws = new WebSocket(webSocketUrl);
  if (ws && reconnectTimer){
    console.log('Socket reconnected');
    clearInterval(reconnectTimer);
  }

  //Extra error-y stuff goes here
  
  //Return the new WebSocket connection
  return ws;
}

/**
 * SocketProvider, which allows us to share the WebSocket connection throughout the app
 * @param props ISocketProvider
 * @returns SocketProvider
 */
export const SocketProvider = (props: ISocketProvider) => {
  //Assign our event handlers
  ws.onopen = wsOpen;

  //When the connection is closed, reconnect after waiting for one second
  ws.onclose = wsClose;
  ws.onerror = wsClose;

  return <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
};