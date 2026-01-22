const { getIO } = require("../socket/socket");

const sendMessage = (req, res) => {
  const { room, message } = req.body;

  const io = getIO();
  io.to(room).emit("receive_message", { room, message });

  res.json({ success: true });
};

module.exports = { sendMessage };
