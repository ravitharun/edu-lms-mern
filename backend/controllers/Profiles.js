const cloudinary = require("../config/cloudinary");
const CreateProfile = require("../models/ProfileSchema");
const User = require("../models/User");

// uodate
const ProfileCreate = async (req, res) => {
    try {
        // const{formdata}=req.
        console.log(req.file, "file");
        console.log(req.body, "body");

        const result = await cloudinary.uploader.upload(req.file?.path,);
        console.log(result.secure_url, 'result')

        const UpdateProfile = await CreateProfile.findOneAndUpdate({ ID: req.body.TecherId }, {
            Name: req.body.Techername,
            Email: req.body.TecherEmail,
            ID: req.body.TecherId,
            Role: req.body.TecheRole,
            About: req.body.About,
            Experience: Number(req.body.Experience),
            Designation: req.body.Designation,
            Qualification: req.body.Qualification,
            ProfileUrl: result.secure_url,
            PhoneNumber: req.body.Phone
        }, { new: true })
        await UpdateProfile.save()
        return res.status(200).json({ message: "Resposne ok." })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error." })
    }

}
const GetProfile = async (req, res) => {
    try {
        const { userid } = req.query;
        console.log(userid,'userid')
        if (!userid) { return res.status(404).json({ message: "Id is missing." }) }
        const get_userProfile = await CreateProfile.findOne({ ID: userid })
        console.log(get_userProfile, 'get_userProfile')
        return res.status(200).json({ message: get_userProfile })
    } catch (error) {
        console.log(error, 'error')
        return res.status(500).json({ message: "Server Error." })
    }

}


module.exports = { ProfileCreate, GetProfile }