import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {

  const [senderId, setSenderId] = useState("");
  //appointmentId State
  const [appointmentId, setAppointmentId] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (appointmentId !== "") {
      socket.emit("join_appointment", appointmentId);
      setSenderId(1); // AuthID
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, appointmentId, senderId });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="appointmentId..."
        onChange={(event) => {
          setAppointmentId(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join appointment</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message </button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
