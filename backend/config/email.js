// require("dotenv").config();
console.log("API KEY:", process.env.RESEND_API_KEY);

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = resend;