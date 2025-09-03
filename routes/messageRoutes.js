const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/messageController");

const router = express.Router();

// Send message to specific user
router.post("/send", isAuthenticated, sendMessage);

// Get all messages with specific user
router.get("/:userId", isAuthenticated, getMessages);

module.exports = router;
