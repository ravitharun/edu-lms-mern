const { AddHolidays } = require("../models/Holidays");

const AddholidaysBulk = async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data,"data")
        if (data.length == 0) {
            console.log("data", data)
            return res.status(404).json({ message: "No" })
        }
        const existingDates = await AddHolidays.find({
            date: { $in: data.map(h => h.date) }
        }).select("date");
        const existingDateSet = new Set(existingDates.map(h => h.date));
       

        const newHolidays = data.filter(h => !existingDateSet.has(h.date));
     

        if (newHolidays.length === 0) {
            return res.status(409).json({ message: "All holidays already exist in database" });
        }


        const AddBulk = await AddHolidays.insertMany(data)
        // await AddBulk.save();
        res.status(201).json({ message: data })


    } catch (error) {
        console.log("err : ", error?.message)
        return res.status(500).json({ message: "server error." })
    }
}
module.exports = { AddholidaysBulk }