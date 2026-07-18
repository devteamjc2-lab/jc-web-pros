import { useEffect, useState } from "react";
import socket from "../socket";

const Chat = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {

    socket.connect();


    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });


    socket.on("receive_message", (data) => {

      setMessages((prev) => [
        ...prev,
        data
      ]);

    });


    return () => {
      socket.disconnect();
      socket.off("receive_message");
    };

  }, []);



  const sendMessage = () => {

    if (!message.trim()) return;


    socket.emit("send_message", {
      user: "Keshav",
      message: message
    });


    setMessage("");

  };


  return (
    <div>

      <h2>Real Time Chat</h2>


      {messages.map((msg, index) => (
        <p key={index}>
          <b>{msg.user}:</b> {msg.message}
        </p>
      ))}


      <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Type message"
      />


      <button onClick={sendMessage}>
        Send
      </button>


    </div>
  );
};


export default Chat;