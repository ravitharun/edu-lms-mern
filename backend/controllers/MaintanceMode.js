const MaintanceModel = require("../models/MaintanceMode")

const maintanceMode = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data)

        if (!data.ActivateTime || !data.ActivateText) {
            console.log({ message: "date and text is required." })
            return res.status(404).json({ message: "date and text is required." })
        }
        if (!data.Admin_Id) {
            return res.status(404).json({ message: "something went wrong" })
        }

        const Addmode = new MaintanceModel({
            modeAddedBy: data.Admin_Id,
            isMaintenanceMode: data.Activate,
            modeText: data.ActivateText,
            maintenanceUntil: data.ActivateTime
        })
        await Addmode.save()
        return res.status(200).json({ message: "Maintance Mode Activated." })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Mode already exists, updating instead of creating duplicate",
            });
        }
        console.log(error.message)
        return res.status(500).json({ message: "server error." })
    }
}

const FetchMode = async (req, res) => {
    try {
        const response = await MaintanceModel.find({})
        return res.status(200).json({ date: response })
    } catch (error) {
        return res.status(500).json({ message: 'server error' })

    }
}
    const UpdateMode = async (req, res) => {
        try {
            const { data } = req.body;
            console.log(data, 'data')
            const response=await MaintanceModel.findByIdAndUpdate({_id:data.id},{isMaintenanceMode:data.type},{new:true})
            return res.status(200).json({ date: 'mode updated' })
        } catch (error) {
            console.log(error,'err')
            return res.status(500).json({ message: 'server error' })

        }
    }
    module.exports = { maintanceMode, FetchMode ,UpdateMode}