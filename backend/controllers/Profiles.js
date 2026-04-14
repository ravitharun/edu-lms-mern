const cloudinary = require("../config/cloudinary");
const CreateProfile = require("../models/ProfileSchema");
const User = require("../models/User");
const { getIO } = require("../socket");

// uodate
const ProfileCreate = async (req, res) => {
    try {
        
        let imageUrl = req.body.ProfileUrl;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const UpdateProfile = await CreateProfile.findOneAndUpdate(
            { ID: req.body.TecherId },
            {
                Name: req.body.Techername,
                Email: req.body.TecherEmail,
                ID: req.body.TecherId,
                Role: req.body.TecheRole,
                About: req.body.About,
                Experience: Number(req.body.Experience),
                Designation: req.body.Designation,
                Qualification: req.body.Qualification,
                ProfileUrl: imageUrl,
                PhoneNumber: req.body.Phone
            },
            { new: true }
        );

        if (!UpdateProfile) {
            const UserPR_CretateProfile = new CreateProfile({
                Name: req.body.Techername,
                Email: req.body.TecherEmail,
                ID: req.body.TecherId,
                Role: req.body.TecheRole,
                About: req.body.About,
                Experience: Number(req.body.Experience),
                Designation: req.body.Designation,
                Qualification: req.body.Qualification,
                ProfileUrl: imageUrl,
                PhoneNumber: req.body.Phone
            });

            await UserPR_CretateProfile.save();
            return res.status(201).json({ message: "User Created." });
        }

        return res.status(200).json({ message: "Profile Updated." });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server Error." });
    }
};



const GetProfile = async (req, res) => {
    try {
        const { userid } = req.query;
        if (!userid) { return res.status(404).json({ message: "Id is missing." }) }
        const get_userProfile = await CreateProfile.findOne({ ID: userid })
        return res.status(200).json({ message: get_userProfile })
    } catch (error) {
        console.log(error, 'error')
        return res.status(500).json({ message: "Server Error." })
    }

}


module.exports = { ProfileCreate, GetProfile }