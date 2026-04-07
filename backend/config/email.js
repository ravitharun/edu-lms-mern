const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 

  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_pass 
  }, family: 4
});

transporter.verify()

  .then(() => console.log("✅ Gmail SMTP Connected"))
  .catch(err => console.error("❌ Error:", err));
module.exports = { transporter }