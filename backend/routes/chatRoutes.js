const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const userController = require("../controllers/userController");

const uploadDirectory = path.join(__dirname, "../uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });
const upload = multer({
	storage: multer.diskStorage({
		destination: uploadDirectory,
		filename: (req, file, callback) => {
			const extension = path.extname(file.originalname);
			callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
		},
	}),
	limits: { fileSize: 25 * 1024 * 1024 },
});

router.post("/conversations", userController.createOrGetConversation);
router.get("/conversations/:userId", userController.getUserConversations);
router.get("/conversation/:conversationId", userController.getConversationById);
router.post("/conversations/:conversationId/members", userController.addGroupMembers);
router.delete("/conversations/:conversationId/members/:memberId", userController.removeGroupMember);
router.patch("/conversations/:conversationId", userController.updateGroupName);
router.delete("/conversations/:conversationId", userController.deleteGroupConversation);
router.get("/messages/:conversationId", userController.getConversationMessages);
router.post("/messages", userController.createMessage);
router.post("/messages/upload", upload.single("file"), userController.uploadMessage);
router.patch("/messages/:messageId", upload.single("file"), userController.updateMessage);
router.delete("/messages/:messageId", userController.deleteMessage);

module.exports = router;
