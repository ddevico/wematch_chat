import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../utils/Auth'
import { Link, useNavigate } from "react-router-dom";

function Home({ socket }) {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");
  const user = useSelector(state => state.userReducer.user)
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate('/signIn')
    return ;
  }

  const callApi = () => {
    socket.emit("connectUserOnChannel", { userName, channelName })
    try {
      fetch('http://localhost:5000/channels/connectUserOnChannel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            channelName: channelName
        }),
      })
      .then((response) => {
      })
    }
    catch (e){
    }
  }

  return (
    <div className="home">
      <h1>Twitch chat clone</h1>
      <input
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <Link
        onClick={event => (!userName || !channelName) ? (event.preventDefault(), alert("Error ! user or channel are missing !")) : callApi()
      }
        to={`/chat/?userName=${userName}&channelName=${channelName}`}
      >
        <button type="submit">Sign In</button>
      </Link>
    </div>
  );
}

export default Home;
