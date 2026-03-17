const { AddAcademicSchema } = require("../models/AddAcademics")


// handelAdd the Data 
const add = async (req, res) => {
    try {
        const { eventData } = req.body
        console.log(eventData, "DATA")
        if (!eventData.EventName || !eventData.Eventend || !eventData.Eventtype || !eventData.Eventsatert || !eventData.Addbyid || !eventData.addbrole) {
            return rrs.status(404).json({ message: "All Feilds are Required." })
        }
        const addData = new AddAcademicSchema({
            EventName: eventData.EventName,
            EventstartDate: eventData.Eventsatert,
            EventendDate: eventData.Eventend,
            Eventtype: eventData.Eventtype,
            Addbyname: eventData.Addbyname,
            Addbyid: eventData.Addbyid,
            AddByrole: eventData.addbrole,
            Descprition: eventData.Descprition,
        })
        await addData.save();
        if (addData) {
            console.log(addData, 'return AddData')
            return res.status(200).json({ message: "DATA ADDED INTO DB." })

        }


    } catch (error) {
        console.log(error, "err")
        return res.status(500).json({ message: "serverErorr." })

    }

}
module.exports = { add }