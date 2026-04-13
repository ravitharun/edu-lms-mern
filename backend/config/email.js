// const nodemailer = require("nodemailer");

// console.log({
//   user: process.env.Email_User,
//   pass: process.env.Email_pass
// })
// // console.log("Transport config:", transporter.options);
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.Email_User,
//     pass: process.env.Email_pass,
//   },
//   connectionTimeout: 10000, // 10 sec
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });
// transporter.verify()

//   .then(() => console.log("✅ Gmail SMTP Connected"))
//   .catch(err => console.error("❌ Error:", err));


// console.log("Transport config:", transporter.options);
// const test = async () => {
//   console.log("test email .");

//   await transporter.sendMail({
//     from: "tr565003@gmail.com",
//     to: "tharunravi672@gmail.com",
//     subject: "Test",
//     text: "Working ✅",
//   });
// }
// test()
// module.exports = { transporter }



const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "tharunravi672@gmail.com", // default (works instantly)
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error);
    return false;
  }
};
module.exports = { sendEmail }