const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // TLS

  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_pass // App Password (no spaces)
  }, family: 4
});

transporter.verify()

  .then(() => console.log("✅ Gmail SMTP Connected"))
  .catch(err => console.error("❌ Error:", err));
module.exports = { transporter }