
const cloudinary = require("../config/cloudinary")
const UploadMaterial = async (req, res) => {
    try {
        console.log(req.body, "bdy");
        console.log(req.file.path, "file");
        const teacher = JSON.parse(req.body.teacher_info);
        console.log(teacher, 'teacher')
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "documents"
        });
        console.log(result, 'result')

        return res.status(200).json({ message: "Checking" })
    } catch (error) {
        console.log("error", error.message)
        return res.status(500).json({ message: "server error" })
    }
}
module.exports = UploadMaterial