



// require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {resend};

const AccountEmailStatus = async (IssuedUser, TouserEmail) => {
    if (!IssuedUser && !TouserEmail) {
        return "Required Info Of the Both Users"
    }
    const info = await resend({
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

    const info = await resend({
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