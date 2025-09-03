const Message = require("../models/Message");
const User = require("../models/User");

// Send message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "Receiver and content required" });
    }

    const newMessage = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat between 2 users
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // specific user ka ID

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 }) // oldest → newest
      .populate("sender", "username email")
      .populate("receiver", "username email");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
