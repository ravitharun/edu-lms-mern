
const redis = require("redis");

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379"
});

module.exports = { redisClient }