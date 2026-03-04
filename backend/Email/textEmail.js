const { transporter } = require("../config/email");

const leaveAddEmail = (data) => {
    console.log(data, "data to send the email")
    const info = transporter.sendMail({
        from: 'tr565003@gmail.com',   // from the user adding 
        to: "tharunravi672@gmail.com", // to the user request email yet to add in thse place
        subject: "Hello ✔",
        text: "Hello world?", 
        html: `<b>Hello${data.id}-${data.techerid} world?</b>`, 
    });
    return "Email Sent."
}
module.exports = leaveAddEmail