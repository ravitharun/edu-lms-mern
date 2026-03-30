const cloudinary = require("cloudinary").v2;
console.log({
  "cloud_name": process.env.CLOUD_NAME,
  "api_key": process.env.API_KEY,
  "api_secret": process.env.API_SECRET,
})
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
