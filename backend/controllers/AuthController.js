const { json } = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { generateRandomId } = require("../generateRandomId");
const cloudinary = require("../config/cloudinary");
const { transporter } = require("../config/email");
const CreateProfile = require("../models/ProfileSchema");
const { redisClient } = require("../Expose/redis");

cloudinary.api.ping()


// Register new user
const NewAccount = async (req, res) => {
  try {
    const formdata = req.body;
    // const Profile = req.file?.path;
    const result = await cloudinary.uploader.upload(req.file?.path);
    const GetBy_email = await User.find({ email: req.body.StudentEmail })
    console.log(GetBy_email, 'GetBy_email')
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
      profilePreview: result.secure_url,
      StudentsYearDepartment: formdata.StudentsYearDepartment,
      resetToken: ""

    };

    const UserProfile = {
      Name: formdata.StudentName,
      Email: formdata.StudentEmail,
      Role: formdata.role,
      About: "",
      Experience: "",
      PhoneNumber: "",
      Designation: "",
      Qualification: "",
      ProfileUrl: result.secure_url,
      StudentsYearDepartment: formdata.StudentsYearDepartment,
    }

    // 3️⃣ Role-based ID
    if (formdata.role === "student") {
      userData.Student_ID = ID;
      userData.department = formdata.StudentsYearDepartment.split(" ")[0]
      UserProfile.ID = ID
      UserProfile.Designation = formdata.role,
        UserProfile.Qualification = ""
    }

    if (formdata.role === "Teacher") {
      await redisClient.del("teachers")
      userData.teacher_Id = ID;
      userData.AccountStatus;
      userData.department = formdata.department
      UserProfile.ID = ID
      UserProfile.Designation = formdata.role,
        UserProfile.Qualification = ""
    }

    if (formdata.role === "Admin") {
      userData.Admin_Id = ID;
      UserProfile.ID = ID
      UserProfile.Designation = formdata.role,
        UserProfile.Qualification = ""
    }

    // Save ONCE
    const saveData = new User(userData);
    const UserInfo = new CreateProfile(UserProfile);

    await saveData.save();
    await UserInfo.save();

    return res.status(201).json({ message: "Account Created" });
  }
  catch (error) {
    console.error(error.message,);
    return res.status(500).json({ error: "Server error" });
  }
};





// Login user
const LoginAccount = async (req, res) => {
  try {
    const { email, Password, role } = req.query;
    const newpassowrd = "tharun2005"
    let hashPassword = bcrypt.hashSync(newpassowrd, 10)
    console.log(hashPassword)


    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    if (!email || !Password || !role) {
      return res.status(400).json({ message: "all inputs are required" })
    }
    const Check_userAccount = await User.findOne({ email })
    if (Check_userAccount.role != role) {
      return res.status(403).json({ message: "Role is incorrect" })
    }
    if (!Check_userAccount) {
      return res.status(403).json({ message: "USer NotFound." })
    }
    // password we will compare now Password input to db Password
    const check_password = await bcrypt.compare(Password, Check_userAccount.password);
    if (!check_password) {
      return res.status(403).json({ message: "The password is incorrect" })
    }

    // main level to say user data are same
    if (Check_userAccount.email == email || Check_userAccount.role == role || check_password) {
      return res.status(200).json({ message: "Logedin", token: token, user: Check_userAccount });
    }

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { NewAccount, LoginAccount };
