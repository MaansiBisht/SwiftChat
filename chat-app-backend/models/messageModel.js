const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    actualRecipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;