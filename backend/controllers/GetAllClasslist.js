const subjectwiseteacher = require("../models/subjectwiseteacher");

// These is used to get the class list assigned by the teachersID reference
const getClasslist = async (req, res) => {
    try {
        const { teacher_Id } = req.query;
        console.log(teacher_Id)
        if (!teacher_Id) {
            console.log({ message: "TeacherID is missing" })
            return res.status(409).json({ message: "TeacherID is missing" })
        }
        const getbyteacher_Id = await subjectwiseteacher.find({ 'subjects.teacherId': teacher_Id })
        if (getbyteacher_Id.length==0) {
            console.log({ message: "NO Classes Found." })
            return res.status(404).json({ message: "NO Classes Found." })
        }
        return res.status(200).json({ message: "Data fetching" })

    } catch (error) {
        console.log(error.message)
    }

}

module.exports = getClasslist