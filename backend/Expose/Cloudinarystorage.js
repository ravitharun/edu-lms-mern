// middleware/upload.js

const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// --------------------
// Profile Image Upload (Cloudinary)
// --------------------

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms_profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({
  storage: profileStorage,
});

// --------------------
// Assignment Upload (Local Disk)
// --------------------

const assignmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/assignments"); // <-- Folder path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadAssignments = multer({
  storage: assignmentStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

module.exports = {
  upload, // Cloudinary (profile images)
  uploadAssignments, // Local disk (assignments)
};