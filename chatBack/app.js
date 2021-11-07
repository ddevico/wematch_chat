const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const dotenv = require('dotenv');
const { getUser, connectUserOnChannel } = require("./chatUser");

dotenv.config();

app.use(express());

const port = process.env.SERVER_PORT;

app.use(cors());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server)

io.on("connection", (socket) => {
  socket.on("connectUserOnChannel", ({ userName, channelName }) => {
    const userConnected = connectUserOnChannel(socket.id, userName, channelName);
    console.log(userConnected)
    
    socket.join(userConnected.channelName);

    socket.emit("message", {
      userId: userConnected.id,
      userName: userConnected.userName,
      text: `Hello ${userConnected.userName}`,
    });

    socket.broadcast.to(userConnected.channelName).emit("message", {
      userId: userConnected.id,
      username: userConnected.userName,
      text: `${userConnected.userName} has joined the chat`,
    });
  });

  socket.on("message", (text) => {
    const userConnected = getUser(socket.id);

    io.to(userConnected.channelName).emit("message", {
      userId: userConnected.id,
      userName: userConnected.userName,
      text: text,
    });
  });
});