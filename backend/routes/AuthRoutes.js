const express = require("express");
const { NewAccount, LoginAccount } = require("../controllers/AuthController");
const authMiddleware = require("../Middleware/Authmiddleware");

const router = express.Router();

router.post("/newDataUser", NewAccount);
router.get("/LoginAccount",authMiddleware, LoginAccount);

module.exports = router;
