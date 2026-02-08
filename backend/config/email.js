const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tr565003@gmail.com",
    pass: "kcocficadwdgncrh" // App Password (no spaces)
  }
});
transporter.verify()
  .then(() => console.log("✅ Gmail SMTP Connected"))
  .catch(err => console.error("❌ Error:", err));
module.exports = { transporter }