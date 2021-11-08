module.exports = (io) => {
    const users = [];

function connectUserOnChannel(id, userName, channelName) {
  const user = { id, userName, channelName };
  users.push(user);

  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

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
      console.log(socket)
      io.to(userConnected.channelName).emit("message", {
        userId: userConnected.id,
        userName: userConnected.userName,
        text: text,
      });
    });
  });
}