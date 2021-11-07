import "./style.scss";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const TwitchChat = ({ socket }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const messageEnd = useRef(null);
  const userName = searchParams.get('userName');
  const channelName = searchParams.get('channelName');

  useEffect(() => {
    socket.on("message", (data) => {
      message.push({
        userId: data.userId,
        userName: data.userName,
        text: data.text,
      });
      setMessage([...message]);
    });
  }, [socket]);

  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [message]);

  const sendMessage = () => {
    if (text !== "") {
      socket.emit("message", text);
      setText("");
    }
  };

  return (
    <div className="chat">
      <div className="channel-name">
        <h2>
          {channelName}
        </h2>
      </div>
      <div className="message">
        {message.map((key) => {
          if (key.userName === userName) {
            return (
              <div className="receiver">
                <p>{key.text}</p>
                <span>{key.userName}</span>
              </div>
            );
          } else if (key.userName === undefined) {
            return (
              <div className="receiver sender">
                <span>{key.text}</span>
              </div>
            )
          } else {
            return (
              <div className="receiver sender">
                <p>{key.text} </p>
                <span>{key.userName}</span>
              </div>
            );
          }
        })}
        <div ref={messageEnd} />
      </div>
      <div className="submit-message">
        <input
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        ></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default TwitchChat;
