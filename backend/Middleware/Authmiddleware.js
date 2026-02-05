const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    // 1️ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2️ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded; // { userId, role }


    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.log('Invalid token')
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
