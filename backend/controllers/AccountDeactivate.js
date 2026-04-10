const User = require("../models/User")
const { ModelReasonDeactivate } = require("../models/AccountDeactivates");
const { redisClient } = require("../Expose/redis");
const { AccountEmailStatus, AccountEmailAccaptenceStatusResponse } = require("../Email/AccountEmailNotification");
const { getIO } = require("../socket");
// Fix the status AccountStatus: true
const AccountDeactivate = async (req, res) => {
    try {
        const io = getIO()
        const { id, IssuedUser } = req.body
        console.log('hey i am api calling for account deactivationg..')
        await redisClient.del("GetallIssues");
        await redisClient.del("myKey")
        if (!id) {
            console.log({ message: "ID is missing for AccountDeactivate." })
            return res.status(404).json({ message: "ID is missing for AccountDeactivate." })
        }
        const updated = await User.findOneAndUpdate({ teacher_Id: id }, { AccountStatus: true }, { new: true }                  // options
        )

        const EmailResponse = await AccountEmailStatus(IssuedUser, updated)
        if (EmailResponse === "Required Info Of the Both Users") {
            console.log('Some thing Went Wrong in While Sending the email')
            return res.status(404).json({ message: "Some thing Went Wrong" })
        }
        io.emit("AccountStatus", updated)
        return res.status(200).json({ message: "ok" })
    } catch (error) {
        console.log(error.message, 'error')
        console.log('error from the AccountDeactivate api.')
        return res.status(500).json({ message: 'server Error.' })
    }
}

// Update the Account Status AccountStatus:False
async function UpdateDeactivate(req, res) {
    try {
        const io=getIO()
        const { id, AdminInfo } = req.body;
        console.log({ id, AdminInfo }, "AdminInfo")
        await redisClient.del("GetallIssues");
        await redisClient.del("myKey")
        if (!id) {
            console.log({ message: "ID is missing for AccountDeactivate." });
            return res.status(404).json({ message: "ID is missing for AccountDeactivate." });
        }
        const updated = await User.findOneAndUpdate({ teacher_Id: id }, { AccountStatus: false }, { new: true } // options
        );
        if (updated.AccountStatus) {
            return console.log("Account is inactive");

        }
        const responseEmail = await AccountEmailAccaptenceStatusResponse(AdminInfo, updated)
        console.log("Account is Activated");
        io.emit("AccountStatusUpdate","Activated",updated)
        return res.status(200).json({ message: updated });
    } catch (error) {
        console.log(error)
        console.log('error from the AccountDeactivate api.');
        return res.status(500).json({ message: 'server Error.' });
    }
}




const AccountDeactivateUpdateReason = async (req, res) => {
    try {
        console.log(req.body)
        await redisClient.del("GetallIssues");
        if (!req.body.name || !req.body.email || !req.body.empid || !req.body.issuetype || !req.body.priorty) {
            console.log({ message: "Some data are missing." })
            return res.status(404).json({ message: "Some data are missing." })

        }
        if (req.body.issuetype == "other") {
            if (!req.body.Reason) {
                console.log({ message: "Reason Is Requred." })
                return res.status(404).json({ message: "Reason Is Requred." })
            }
        }
        const add = new ModelReasonDeactivate({
            name: req.body.name,
            email: req.body.email,
            empid: req.body.empid,
            IssueType: req.body.issuetype,
            Reason: req.body.issuetype == "other" ? '' : req.body.Reason,

        })
        await add.save()
        return res.status(201).json({ message: req.body })

    } catch (error) {
        console.log(error.message, ' error.message')
        return res.status(500).json({ message: error.message })

    }
}

const GetAccountDeactivateUpdateReason = async (req, res) => {
    try {

        const CacheGetallIssues = redisClient.get("GetallIssues");
        console.log(CacheGetallIssues, 'CacheGetallIssues')
        if (CacheGetallIssues) { return res.status(200).json({ message: CacheGetallIssues }) }
        const GetallIssues = await ModelReasonDeactivate.find({})
        await redisClient.setEx("GetallIssues", 500, GetallIssues)
        return res.status(200).json({ message: GetallIssues })
    }
    catch (err) {
        console.log(err.message, 'from get all issues from db')
        return res.status(500).json({ message: "server error" })
    }
}

module.exports = { AccountDeactivate, UpdateDeactivate, AccountDeactivateUpdateReason, GetAccountDeactivateUpdateReason }