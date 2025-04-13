const io = require("socket.io")(8800, {
  cors: { origin: "http://localhost:3000", rejectUnauthorized: false },
});

let activeUser = [];

io.on("connection", (socket) => {
  socket.on("newUserAdd", (newUserId) => {
    if (!activeUser.some((user) => user.userId == newUserId)) {
      activeUser.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("getUsers", activeUser);
  });

  socket.on("sendMessage", (message) => {
    const { receiverId } = message;
    const user = activeUser.find((user) => user.userId == receiverId);
    if (user) {
      console.log(message);
      io.to(user.socketId).emit("receiveMessage", message);
    }
  });

  socket.on("connect_error", (err) => {
    console.log(`connect error due to ${err.message}`);
  });

  socket.on("disconnect", () => {
    activeUser = activeUser.filter((user) => user.socketId != socket.id);
    io.emit("getUsers", activeUser);
  });
});
