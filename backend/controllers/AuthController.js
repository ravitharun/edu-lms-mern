const { json } = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { generateRandomId } = require("../generateRandomId");
const cloudinary = require("../config/cloudinary");

cloudinary.api.ping()


// Register new user
const NewAccount = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // text fields
    console.log("REQ FILE:", req.file); // file info from Cloudinary
    const formdata=req.body;
    const Profile = req.file?.path;
    const result = await cloudinary.uploader.upload(Profile,);
    const GetBy_email = await User.find({ email: req.body.StudentEmail })
    if (!GetBy_email) {
      return res.status(400).json({ message: "Emails is already is exits please use another email to login." })
    }
    if (!formdata.StudentEmail || !formdata.StudentName || !formdata.StudentPassword || !formdata.StudentConifrmPassword || !formdata.role) {
      return res.status(400).json({ message: "Some inputs are missing" })
    }
    if (formdata.StudentPassword != formdata.StudentConifrmPassword) {
      return res.status(400).json({ message: " Both The Passwords are incorrect." })
    }
    let hashPassword = bcrypt.hashSync(formdata.StudentPassword, 10)
    let hashConfirmPassword = bcrypt.hashSync(formdata.StudentConifrmPassword, 10)
    // generate the id users/teachers both

    const ID = generateRandomId(formdata.role, 4)

    const userData = {
      name: formdata.StudentName,
      email: formdata.StudentEmail,
      password: hashPassword,
      ConfirmPassword: hashConfirmPassword,
      role: formdata.role,
      profilePreview: result.secure_url
    };

    // 3️⃣ Role-based ID
    if (formdata.role === "student") {
      userData.Student_ID = ID;
    }

    if (formdata.role === "Teacher") {
      userData.teacher_Id = ID;
    }
    if (formdata.role === "Admin") {
      userData.Admin_Id = ID;
    }

    // 4️⃣ Save ONCE
    const saveData = new User(userData);
    await saveData.save();

    return res.status(201).json({ message: "Account Created" });
  }
  catch (error) {
    console.error(error,);
    return res.status(500).json({ error: "Server error" });
  }
};






// const authHeader = req.headers.authorization;
// if (!authHeader) {
//   // no token sent
//   return console.log('No token.')
// }
// const token = authHeader.split(" ")[1];




// Login user
const LoginAccount = async (req, res) => {
  try {
    const { email, Password, role } = req.query;
    console.log({ email, Password, role })

    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token)
    if (!email || !Password || !role) {
      return res.status(400).json({ message: "all inputs are required" })
    }
    const Check_userAccount = await User.findOne({ email })
    if (!Check_userAccount) {
      return res.status(403).json({ message: "USer NotFound." })
    }
    // password we will compare now Password input to db Password
    const check_password = await bcrypt.compare(Password, Check_userAccount.password);
    console.log(check_password, 'check_password')
    if (!check_password) {
      return res.status(403).json({ message: "The password is incorrect" })
    }

    // main level to say user data are same
    if (Check_userAccount.email == email || Check_userAccount.role == role || check_password) {
      console.log("first")
      return res.status(200).json({ message: "Logedin", token: token, user: Check_userAccount });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { NewAccount, LoginAccount };
