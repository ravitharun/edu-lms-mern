const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    //  Getting  token from Authorization header
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authHeader")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log({ message: "No token provided" })
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token, "tkn")


    //  Verify token
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
