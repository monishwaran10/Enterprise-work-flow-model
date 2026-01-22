const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
    });

    socket.on("send_message", (data) => {
      io.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = { initSocket, getIO };
