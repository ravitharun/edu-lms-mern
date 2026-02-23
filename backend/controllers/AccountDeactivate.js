const User = require("../models/User")
// const DeactivateModel
const { ModelReasonDeactivate } = require("../models/AccountDeactivates");

const AccountDeactivate = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            console.log({ message: "ID is missing for AccountDeactivate." })
            return res.status(404).json({ message: "ID is missing for AccountDeactivate." })
        }
        const updated = await User.findOneAndUpdate({ teacher_Id: id }, { AccountStatus: true }, { new: true }                  // options
        )
        return res.status(200).json({ message: "ok" })
    } catch (error) {
        console.log('error from the AccountDeactivate api.')
        return res.status(500).json({ message: 'server Error.' })
    }
}


const UpdateDeactivate = async (req, res) => {
    try {
        const { id } = req.body
        console.log(id, 'UpdateDeactivate')
        if (!id) {
            console.log({ message: "ID is missing for AccountDeactivate." })
            return res.status(404).json({ message: "ID is missing for AccountDeactivate." })
        }
        const updated = await User.findOneAndUpdate({ teacher_Id: id }, { AccountStatus: false }, { new: true }                  // options
        )
        console.log(updated, 'ipdated')
        return res.status(200).json({ message: updated })
    } catch (error) {
        console.log('error from the AccountDeactivate api.')
        return res.status(500).json({ message: 'server Error.' })
    }
}


const AccountDeactivateUpdateReason = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.name || !req.body.email || !req.body.empid || !req.body.issuetype || !req.body.priorty) {
            console.log({ message: "Some data are missing." })
            return res.status(404).json({ message: "Some data are missing." })

        }
        if(req.body.issuetype=="other"){
            if(!req.body.Reason){
                console.log({message:"Reason Is Requred."})
                return res.status(404).json({message:"Reason Is Requred."})
            }
        }
        const add = new ModelReasonDeactivate({
            name: req.body.name,
            email: req.body.email,
            empid: req.body.empid,
            IssueType: req.body.issuetype,
            Reason: req.body.issuetype=="other"?'':req.body.Reason, 

        })
        await add.save()
        return res.status(201).json({ message: req.body })

    } catch (error) {
        console.log(error.message, ' error.message')
        return res.status(500).json({ message: error.message })

    }
}

module.exports = { AccountDeactivate, UpdateDeactivate, AccountDeactivateUpdateReason }