import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Home({ socket }) {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");

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
        onClick={event => (!userName || !channelName) ? (event.preventDefault(), alert("Error ! user or channel are missing !")) : socket.emit("connectUserOnChannel", { userName, channelName })}
        to={`/chat/?userName=${userName}&channelName=${channelName}`}
      >
        <button type="submit">Sign In</button>
      </Link>
    </div>
  );
}

export default Home;
