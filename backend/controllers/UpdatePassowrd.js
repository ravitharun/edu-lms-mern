const { transporter } = require("../config/email")
const User = require("../models/User")
const crypto = require("crypto");

const token = crypto.randomBytes(32).toString("hex");




const bcrypt = require('bcrypt');

const passowrdUpdateEmail = async (req, res) => {
  try {
    let { email } = req.body
    if (email == "tharunravi67122@gmail.com") {
      email = 'tharunravi672@gmail.com'
    }
    console.log(email)
    if (!email) {
      console.log(email, "email is null")
      return res.status(404).json({ message: "fill the required Email id is required" })
    }
    const Check_emailIsexits = await User.findOne({ email: email })
    console.log(Check_emailIsexits, 'Check_emailIsexits')
    if (!Check_emailIsexits) {
      console.log(`these email${email} is not exits.`)
      return res.status(403).json({ message: `these email${email} is not exits.` })
    }
    // const token=jwt
    Check_emailIsexits.resetToken = token
    Check_emailIsexits.resetTokenExpiry =  Date.now() + 10 * 60 * 1000;

    await Check_emailIsexits.save()
    const resetLink = `https://LMSTeam.com/reset-password?token=${token}`;
    console.log(token, 'token')
    // email headers
    const info = await transporter.sendMail({
      from: 'tharunravi6722@gmail.com',
      to: email,
      subject: "Reset Your Password 🔐",
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      
      <!-- Header -->
      <div style="background:#2563eb; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0;">LMS Team</h1>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#333;">
        <h2>Reset your password</h2>

        <p>Hello,</p>
        <p>
          We received a request to reset your account password.
          Click the button below to create a new password.
        </p>

        <!-- Button -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${resetLink}"
             style="background:#2563eb; color:#ffffff; padding:14px 28px;
                    text-decoration:none; border-radius:6px; font-weight:bold;
                    display:inline-block;">
            Update Password
          </a>
        </div>

        <p>
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <div style="background:#fef3c7; padding:15px; border-radius:6px; margin-top:20px;">
          <p style="margin:0;">
            ⚠️ If you did not request this, you can safely ignore this email.
          </p>
        </div>

        <p style="margin-top:30px;">
          Thanks,<br/>
          <strong>LMS Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f8fafc; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
        © ${new Date().getFullYear()} LMS Team. All rights reserved
      </div>

    </div>
  </div>
  `
    });
    console.log({ message: "emailSent." }, 'sw')

    return res.status(200).json({ message: "emailSent." })
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
  }

}



const updatepassword = async (req, res) => {
  try {
    const { token, password } = req.body




    console.log({ token, password })





    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    })
    if (!user) {
      console.log({ message: "Token expired." })
      return res.status(401).json({ message: "Token expired." })
    }
    if (!password) {
      console.log({ message: "Password is required ." })
      return res.status(404).json({ message: "Password is required ." })
    }
    let hashPassword = bcrypt.hashSync(password, 10)
    let hashConfirmPassword = bcrypt.hashSync(password, 10)
    user.password = hashPassword
    user.ConfirmPassword = hashConfirmPassword
    user.resetToken = null
    user.resetTokenExpiry = null
    await user.save()

    return res.status(200).json({ message: `${password}` })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Server error." })
  }
}
module.exports = { passowrdUpdateEmail, updatepassword }