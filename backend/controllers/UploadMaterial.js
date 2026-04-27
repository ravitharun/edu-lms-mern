
const cloudinary = require("../config/cloudinary");
const MaterialsSchema = require("../models/UploadMatearilas");
const UploadMaterial = async (req, res) => {
    try {
        // console.log(req.body, "bdy");
        // console.log(req.file.path, "file");
        if (!req.file) { return res.status(404).json({ message: "file is required" }) }
        const teacher = JSON.parse(req.body.teacher_info);
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "documents"
        });
        const saveDb = new MaterialsSchema({
            Class: req.body.Name,
            subjectname: req.body.subjectname.split("-")[0],
            Description: req.body.Description,
            CourseID:req.body.subjectname.split("-")[1],
            teacher_id: teacher.teacher_id,
            UploadUrl: result.secure_url
        })
        await saveDb.save()
        return res.status(200).json({ message: "Pdf Upoloaded" })
    } catch (error) {
        console.log("error", error.message)
        return res.status(500).json({ message: "server error" })
    }
}


const fetchPdfs = async (req, res) => {
    try {
        const { ClassSection } = req.query
        console.log(ClassSection,'ClassSection')
        if (!ClassSection) { return res.status(404).json({ message: "required fields.,Classsection missing.." }) }
        const getByDb = await MaterialsSchema.find({ Class: ClassSection })
        console.log(getByDb,'getByDb')
        if (!getByDb) { return res.status(404).json({ message: "not found..." }) }

        return res.status(200).json({ message: `${ClassSection} these fetched...`, data: getByDb })

    } catch (error) {
        return res.status(500).json({ message: "server error" })

    }
}
module.exports = {UploadMaterial,fetchPdfs}