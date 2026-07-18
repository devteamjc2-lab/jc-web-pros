const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.get("/get-all-users", userController.getAllUsers);



module.exports = router;