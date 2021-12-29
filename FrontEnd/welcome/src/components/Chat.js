import React from 'react'
import  {useEffect , useState} from 'react'

function Chat({socket}) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        
        console.log("got socket ,,,, ");
  if (!socket)return;
      const messageListener = (message) => {
        setMessages((prevMessages) => {
          const newMessages = {...prevMessages};
          newMessages[message.id] = message;
          return newMessages;
        });
      };
    
     // socket.on('message', messageListener);
      socket.emit('message', "hi");

  
      return () => {
        socket.off('message', messageListener);
      };
    }, [socket]);
    return (
        <div>
            <h1>test</h1>
        </div>
    )
}

export default Chat
