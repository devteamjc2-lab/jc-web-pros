const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/conversations", userController.createOrGetConversation);
router.get("/conversations/:userId", userController.getUserConversations);
router.get("/conversation/:conversationId", userController.getConversationById);
router.post("/conversations/:conversationId/members", userController.addGroupMembers);
router.delete("/conversations/:conversationId/members/:memberId", userController.removeGroupMember);
router.patch("/conversations/:conversationId", userController.updateGroupName);
router.delete("/conversations/:conversationId", userController.deleteGroupConversation);
router.get("/messages/:conversationId", userController.getConversationMessages);
router.post("/messages", userController.createMessage);

module.exports = router;
