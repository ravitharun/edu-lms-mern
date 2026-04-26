const express=require("express")
const UploadMaterial = require("../controllers/UploadMaterial")
const UploadGuide=express.Router()

UploadGuide.post("/Upload/Materials",UploadMaterial)
module.exports=UploadGuide