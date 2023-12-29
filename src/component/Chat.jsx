import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from "@mui/icons-material/Send";

export default function Chat({ socket, userName, id }) {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: id,
        currentuser: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((content,index) => {
            return (
              <div
                className="message"
                id={userName === content.currentuser ? "you" : "other"} 
                key={index}
              >
                <div className="container">
                  <div className="arrow">
                    <div className="outer"></div>
                    <div className="inner"></div>
                  </div>
                  <div className="message-body">
                      <p>{content.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{content.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="send message..."
          onChange={(e) => {
            setcurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button type="button" onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
