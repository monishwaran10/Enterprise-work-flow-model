const { getIO } = require("../socket/socket");

const sendMessage = (req, res) => {
  const { room, message } = req.body;

  const io = getIO();
  io.to(room).emit("receive_message", { room, message });

  res.status(200).json({
    success: true,
    message: "Message sent",
  });
};

module.exports = { sendMessage };
