import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

function Home({ socket }) {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
    socket.emit("connectUserOnChannel", { user, channelName })
  }, [socket])

  const callApi = () => {
    setUserName(user)
    socket.emit("connectUserOnChannel", { user, channelName })
  }

  return (
    <div className="home">
      <h1>Twitch chat clone</h1>
      <input
        placeholder="Channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <Link
        onClick={event => (!channelName) ? (event.preventDefault(), alert("Error ! user or channel are missing !")) : callApi()
      }
        to={`/chat/?channelName=${channelName}`}
      >
        <button type="submit">Enter</button>
      </Link>
    </div>
  );
}

export default Home;
