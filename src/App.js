import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./component/Chat";
const socket = io.connect("http://localhost:3001");
function App() {
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [showchat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && id !== "") {
      socket.emit("event", id);
      setShowChat(true);
    }

  };

  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h4>JOIN CHAT</h4>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <button  className="btn" type="button" onClick={joinRoom}>
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} id={id} />
      )}
    </div>
  );
}

export default App;
