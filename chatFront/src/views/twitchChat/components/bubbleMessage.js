import ".././style.scss";
import React, { useEffect, useRef } from "react";

const BubbleMessage = ({ message, userName, editMessage}) => {
    const messageEnd = useRef(null);
    const scrollToBottom = () => {
        messageEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(scrollToBottom, [message]);

    return (
      <div className="message">
        {message.map((key) => {
          if (key.userName === userName) {
            return (
              <div className="receiver sender" >
                <p>{key.text}</p>
                <button onClick={() => editMessage(key)}>Edit</button>
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
              <div className="receiver">
                <p>{key.text} </p>
                <span>{key.userName}</span>
              </div>
            );
          }
        })}
        <div ref={messageEnd} />
      </div>
  );
}
export default BubbleMessage;
