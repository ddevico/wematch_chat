import ".././style.scss";
import React, { useEffect, useRef } from "react";

const BubbleMessage = ({ messages, userName, editMessage }) => {
  const messageEnd = useRef(null);
  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="message">
      {messages.map((message, key) => {
        if (message.userName === userName) {
          return (
            <div key={key} className="receiver sender">
              <p>{message.text}</p>
              <span>{message.userName} <a onClick={() => editMessage(message)} style={{ cursor: 'pointer' }}>edit</a></span>
            </div>
          );
        } else {
          return (
            <div key={key} className="receiver">
              <p>{message.text}</p>
              <span>{message.userName}</span>
            </div>
          );
        }
      })}
      <div ref={messageEnd} />
    </div>
  );
}
export default BubbleMessage;
