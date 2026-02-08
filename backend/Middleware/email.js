// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const token = jwt.sign(
    { email: User.email, id: User._id },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: "1m" } // token valid for 15 minutes
);

module.exports = { token }
