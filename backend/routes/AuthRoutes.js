const express = require("express");
const { NewAccount, LoginAccount } = require("../controllers/AuthController");

const router = express.Router();

router.get("/newDataUser3023", NewAccount);
router.get("/newDataUser302134", NewAccount);
router.get("/LoginAccount", LoginAccount);

module.exports = router;
