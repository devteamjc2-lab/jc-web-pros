const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/conversations", userController.createOrGetConversation);
router.get("/conversations/:userId", userController.getUserConversations);
router.get("/messages/:conversationId", userController.getConversationMessages);
router.post("/messages", userController.createMessage);

module.exports = router;
