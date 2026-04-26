const express=require("express")
const UploadMaterial = require("../controllers/UploadMaterial")
const {uploadPdf} = require("../Middleware/upload")
const UploadGuide=express.Router()
// UploadGuide.post("/Upload/Materials",uploadPdf.single("file"),UploadMaterial)
UploadGuide.post("/Upload/Materials", (req, res, next) => {
  uploadPdf.single("file")(req, res, function (err) {
    if (err) {
      console.log("MULTER ERROR:", err.message);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, UploadMaterial);
module.exports=UploadGuide