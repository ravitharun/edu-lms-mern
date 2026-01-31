const User = require("../models/User");

// Register new user
const NewAccount = async (req, res) => {
  try {
    console.log("NewAccount route hit");
    // Example response
    return res.status(200).json({ message: "NewAccount works" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Login user
const LoginAccount = async (req, res) => {
  try {
    console.log("LoginAccount route hit");
    return res.status(200).json({ message: "LoginAccount works" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { NewAccount, LoginAccount };
