const protect = require("../middleware/protect");
const Message = require("../models/messageModel");

const messageController = async (req, res) => {
  const { userId: selectedUserId } = req.params;
  const { _id: yourUserId } = await protect(req);

  const messages = await Message.find({
    $or: [
      { sender: selectedUserId, recipient: yourUserId },
      { sender: yourUserId, recipient: yourUserId, actualRecipient: selectedUserId }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
};

module.exports = messageController;

