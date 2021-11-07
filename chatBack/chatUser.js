const users = [];

function connectUserOnChannel(id, userName, channelName) {
  const user = { id, userName, channelName };
  users.push(user);

  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  connectUserOnChannel,
  getUser,
};
