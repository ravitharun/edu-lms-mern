const rateLimit = require("express-rate-limit");

// login limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, try again later",
});

// API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.log("Rate limit exceeded ❌");
        console.log("Rate limit exceeded ❌");
        res.status(429).json({
            message: "Too many requests"
        });
    }
});

module.exports = {
    loginLimiter,
    apiLimiter,
};