import { useState } from 'react';
import { useSocket } from './lib/contexts/SocketContext/hooks/useSocket';
import { useSocketOnClose } from './lib/contexts/SocketContext/hooks/useSocketOnClose';
import { useSocketOnMessage } from './lib/contexts/SocketContext/hooks/useSocketOnMessage';
import { useSocketOnOpen } from './lib/contexts/SocketContext/hooks/useSocketOnOpen';

function App() {
  //Our time hook. This is simply a string that will be updated by our SocketContext
  const [lastTime, setLastTime] = useState<string>('N/A');
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  
  //Get our WebSocket connection
  const socket = useSocket();

  //When the socket is open, send the activity request
  useSocketOnOpen((message: any) => {
    console.log('Socket Connected');
  });
  
  //When we receieve a message from the WebSocket, update the actions
  useSocketOnMessage((message: MessageEvent) => {
    setLastTime(current => time);
    setTime(current => message.data);
  });

  //When we receieve a message from the WebSocket, update the actions
  useSocketOnClose((message: MessageEvent) => {
    console.log('Socket Closed');
  });

  return (
    <div className="App">
      Time: {time}
      <br />
      Last Time: {lastTime}
    </div>
  )
}

export default App
