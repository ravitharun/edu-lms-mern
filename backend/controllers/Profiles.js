const cloudinary = require("../config/cloudinary");
const CreateProfile = require("../models/ProfileSchema");
const ProfileCreate = async (req, res) => {
    try {
        // const{formdata}=req.
        console.log(req.file, "file");
        console.log(req.body, "body");

        const result = await cloudinary.uploader.upload(req.file?.path,);
        console.log(result.secure_url, 'result')
        const addProfile = new CreateProfile({
            Name: req.body.Techername,
            Email: req.body.TecherEmail,
            ID: req.body.TecherId,
            Role: req.body.TecheRole,
            About: req.body.About,
            Experience: Number(req.body.Experience),
            Designation: req.body.Designation,
            Qualification: req.body.Qualification,
            ProfileUrl: result.secure_url,

        })
        await addProfile.save()
        return res.status(200).json({ message: "Resposne ok." })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error." })
    }

}
const GetProfile = async (req, res) => {
    try {

        return res.status(200).json({ message: "Resposne ok." })
    } catch (error) {
        return res.status(500).json({ message: "Server Error." })
    }

}


module.exports = { ProfileCreate, GetProfile }