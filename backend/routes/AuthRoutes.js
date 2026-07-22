const express = require("express");
const { NewAccount, LoginAccount, NewAxcessToken } = require("../controllers/AuthController");
const {upload} = require("../Middleware/upload");

const router = express.Router();

router.post("/newDataUser",upload.single("profile") ,NewAccount);
router.get("/LoginAccount", LoginAccount);
router.post("/refresh-token", NewAxcessToken);

module.exports = router;
