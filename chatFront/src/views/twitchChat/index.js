import "./style.scss";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import { logout, getToken } from '../../utils/Auth'
import { setUser } from '../../store/action/userAction'
import Message from "./components/bubbleMessage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { useSearchParams, useNavigate } from "react-router-dom";

const TwitchChat = ({ socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  let userName = useSelector(state => state.userReducer.user)
  const channelName = searchParams.get('channelName');
  const navigate = useNavigate();

  if (!userName) {
    userName = getToken()
  }

  async function getMessages() {
    try {
      await fetch('http://localhost:5000/messages/getMessages/' + channelName, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
     })
      .then((response) => response.json())
      .then((response) => {
        setMessages(response)
      })
    } catch (error) {
    }
  }

  useEffect(() => {
    socket.emit("connectUserOnChannel", { userName, channelName })
  }, [socket])

  useEffect(() => {
    getMessages()
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      getMessages()
    });
  }, [socket]);

  const sendMessage = () => {
    if (text !== "") {
      if (updateMessage){
        fetch('http://localhost:5000/messages/updateMessage/' + updateMessage._id, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: updateMessage.userName,
            channelName: updateMessage.channel,
            message: text
          }),
        })
        .then((response) => {
          socket.emit("message", text);
          getMessages()
          setUpdateMessage(null);
        })
        setText("");
      }
      else {
        socket.emit("message", text);
        fetch('http://localhost:5000/messages/addMessage', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: userName,
            channelName: channelName,
            message: text
          }),
        })
        .then((response) => {
          messages.push({
            userName: userName,
            channelName: channelName,
            text: text
          });
          setMessages([...messages]);
        })
        setText("");
      }
    }
  };

  const editMessage = (key) => {
    setText(key.text);
    setUpdateMessage(key);
  }

  const disconnectUser = () => {
    setUser(false)
    window.localStorage.removeItem("user")
    sessionStorage.removeItem("@SecretToken")
    navigate('/signIn')
  }

  return (
    <div className="chat">
      <div className="channel-name">
          <h2>
            {channelName} channel
          </h2>
          <FontAwesomeIcon onClick={() => disconnectUser()} style={{marginTop: "19px", marginRight:"10px", cursor: 'pointer'}} color="white" size="2x" ali icon={faSignOutAlt} />
      </div>
      <Message messages={messages} userName={userName} editMessage={editMessage}/>
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
