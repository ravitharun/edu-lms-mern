const User = require("../models/User")

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
        console.log(id,'UpdateDeactivate')
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


module.exports = { AccountDeactivate, UpdateDeactivate }