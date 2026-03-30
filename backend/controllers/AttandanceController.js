const User = require("../models/User");

const GetStudents = async (req, res) => {
    try {
        const { ClassID } = req.query;
        console.log(ClassID,'ClassID')

        let format = ClassID

        if (!ClassID) {
            console.log('class id is missing.')
            return res.status(404).json({ message: "SomeThing went Wrong." })
        }
        const response = await User.find({ StudentsYearDepartment: format.split("-")[1] + " " + format.split("-")[2] })

        return res.status(200).json({ message: response })
    } catch (error) {
        return res.status(500).json({ message: "server Error" })
    }
}

// mark Attandance
const markAttandance = async (req, res) => {
    console.log('markAttandance like makr by classid and stduents data')
}

module.exports = { GetStudents, markAttandance }