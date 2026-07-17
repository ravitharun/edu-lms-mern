const { AddTimetableSchema } = require("../models/TimeTableModel")
const FetchStudentTimetabel = async (req, res) => {
    try {
     
        const { Department, SemesterByyear } = req.query
        if (!Department || !SemesterByyear) return res.status(404).json({ message: "SomeThing Went Wrong." })
        const response = await AddTimetableSchema.find({ Department: Department.toUpperCase(), SemesterByyear: SemesterByyear.toUpperCase() })
        if (response.length == 0) {
            return res.status(404).json({ message: "No response" })
        }
        return res.status(200).json({ message: response, Department, SemesterByyear })
    } catch (error) {
        console.log(error?.message, "Err From the FetchStudentTimetabel ")
        return res.status(500).json({ message: "Server Error." })
    }

}
module.exports = { FetchStudentTimetabel }