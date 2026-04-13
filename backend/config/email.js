const nodemailer = require("nodemailer");

console.log({
  user: process.env.Email_User,
  pass: process.env.Email_pass
})
// console.log("Transport config:", transporter.options);
const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 587,
  secure: false, auth: {
    user: process.env.Email_User,
    pass: process.env.Email_pass
  },
  family: 4, logger: true,
  debug: true,
});
transporter.verify()

  .then(() => console.log("✅ Gmail SMTP Connected"))
  .catch(err => console.error("❌ Error:", err));


  console.log("Transport config:", transporter.options);
const test = async () => {
  console.log("test email .");

  await transporter.sendMail({
    from: "tr565003@gmail.com",
    to: "tharunravi6722@gmail.com",
    subject: "Test",
    text: "Working ✅",
  });
}
test()
module.exports = { transporter }