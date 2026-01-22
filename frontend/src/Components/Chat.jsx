import { useEffect, useState } from "react";
import { socket } from "../Constant/socket";

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message !== "") {
      const messageData = {
        room,
        message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  return (
    <div>
      <h2>Socket Chat</h2>

      <input
        placeholder="Room ID"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <div style={{ border: "1px solid #ccc", height: 200, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.message} <small>({msg.time})</small>
          </p>
        ))}
      </div>

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
