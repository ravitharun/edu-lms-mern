
const { transporter, sendEmail } = require("../config/email");
const AccountEmailStatus = async (IssuedUser, TouserEmail) => {
    console.log(TouserEmail, 'TouserEmail')
    if (!IssuedUser && !TouserEmail) {
        return "Required Info Of the Both Users"
    }
    console.log(IssuedUser?.email, 'IssuedUser?.email')
    const info = await sendEmail({
        from: ` ${IssuedUser?.email}`,
        to: `${TouserEmail.email == 'tharunraviERP672@gmail.com' ? "tharunravi672@gmail.com" : "tharunravi672@gmail.com"}`,
        subject: `Account Status-Your Account is ${"Your Account is Deactivated By the Admin"}`,
        text: `
Dear ${TouserEmail?.name || "user"},

Your account status has been updated.

Status: ${"Your Account is Deactivated By The Admin"}
Updated By: Admin

 Please contact admin for more details.
${IssuedUser?.email}
         

Regards,  
 Admin Team
`    })
}


const AccountEmailAccaptenceStatusResponse = async (IssuedUser, TouserEmail) => {
    if (!IssuedUser && !TouserEmail) {
        return "Required Info Of the Both Users"
    }
   
    const info = await sendEmail({
        from: ` ${IssuedUser?.email}`,
        to: `${TouserEmail.email == 'tharunraviERP672@gmail.com' ? "tharunravi672@gmail.com" : "tharunravi672@gmail.com"}`,
        subject: `Account Status-Your Account is Your Account is activated By the Admin`,
        text: `
Dear ${TouserEmail?.name || "user"},

Your account status has been updated.

Status: Your Account is activated By The Admin
Updated By: Admin ${new Date()}


         

Regards,  
 Admin Team
`    })
}

module.exports = { AccountEmailStatus, AccountEmailAccaptenceStatusResponse }