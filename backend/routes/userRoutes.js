const express = require("express");

const router = express.Router();

const {
    getAllUsers
} = require("../controllers/userController");

// GET API
router.get("/test", getAllUsers);

module.exports = router;