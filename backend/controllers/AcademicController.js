const { redisClient } = require("../Expose/redis")
const { AddAcademicSchema } = require("../models/AddAcademics")
const { AddTimetableSchema } = require("../models/TimeTableModel")


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
const getData = async (req, res) => {
    try {
        const CacheData = redisClient.get("AcademicDetails")
        if (CacheData) {
            return res.status(200).json({ message: CacheData })
        }
        const getdata = await AddAcademicSchema.find({})

        await redisClient.SETEX("AcademicDetails", 500, getData)
        return res.status(200).json({ message: getdata })
    } catch (error) {
        console.log("error : ", error)
        return res.status(500).json({ message: 'server Error' })


    }

}

// ADD TimeTable
const AddTimeTable = async (req, res) => {
    try {

        const { data } = req.body
        console.log(data)
        if (!data.Department || !data.SemesterByyear || !data.StartTime || !data.EndTime || !data.AddSubject || !data.AddedByID) {
            return res.status(404).json({ messsage: "All Feilds are rquired." })
        }
        await AddTimetableSchema.create(data)

        return res.status(201).json({ message: "Data Saved" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server Error" })

    }
}

const GetTimeTableBySemester = async (req, res) => {

    try {
        const { data } = req.query
        if (!data) {
            return res.status(404).json({ message: "Some thing Went Wrong." })
        }
        const CacheTimeTable = redisClient.get("TimeTable")
        if (CacheTimeTable) { return res.status(200).json({ message: CacheTimeTable }) }
        const ResponseData = await AddTimetableSchema.find({ SemesterByyear: data })
        if (ResponseData.length == 0) {
            return res.status(200).json({ message: `No data.` })
        }
        return res.status(200).json({ message: ResponseData })

    } catch (error) {
        console.log(error.message)
        return res.status(200).json({ message: "Server Error." })

    }
}
module.exports = { add, getData, AddTimeTable, GetTimeTableBySemester }