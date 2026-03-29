// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudnary"); // your cloudinary config

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
