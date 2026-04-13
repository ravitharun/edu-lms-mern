const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // ✅ correct for 465
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_pass
  },
  family: 4
});
transporter.verify()

  .then(() => console.log("✅ Gmail SMTP Connected"))
  .catch(err => console.error("❌ Error:", err));
module.exports = { transporter }