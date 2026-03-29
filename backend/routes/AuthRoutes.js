const express = require("express");
const { NewAccount, LoginAccount } = require("../controllers/AuthController");
const upload = require("../Middleware/upload");

const router = express.Router();

router.post("/newDataUser",upload.single("profile") ,NewAccount);
router.get("/LoginAccount", LoginAccount);

module.exports = router;
