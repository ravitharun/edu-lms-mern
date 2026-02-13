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
        const teacherSubjects = await subjectwiseteacher.find(
            { 'subjects.teacherId': teacher_Id },
            {
                _id: 0,                               // exclude _id
                classId: 1,                            // include classId
                department: 1,                         // include department
                year: 1,                               // include year
                subjects: { $elemMatch: { teacherId: teacher_Id } } // only the teacher's subjects
            }

        )




        console.log(teacherSubjects, 'teacherSubjects')










        if (teacherSubjects.length == 0) {
            console.log({ message: "NO Classes Found." })
            return res.status(404).json({ message: "NO Classes Found." })
        }
        return res.status(200).json({ message: teacherSubjects })

    } catch (error) {
        console.log(error.message)
    }

}
// This is used to get the class section assigned by the teachersID reference
const GetClassSection = async (req, res) => {
    try {
        const { teacher_Id } = req.query;
        console.log(teacher_Id,'teacher_Id from the GetClassSection Api Call.')

        if (!teacher_Id) {
            console.log({ message: "TeacherID is missing" })
            return res.status(409).json({ message: "TeacherID is missing" })
        }
        const teacherSubjects = await subjectwiseteacher.find(
            { 'subjects.teacherId': teacher_Id },
            {
                _id: 0,                               // exclude _id
                classId: 1,                            // include classId
                department: 1,                         // include department
                year: 1,                               // include year
                subjects: { $elemMatch: { teacherId: teacher_Id } } // only the teacher's subjects
            }

        )
        console.log(teacherSubjects, 'teacherSubjects from the GetClassSection Api Call.')
        if (teacherSubjects.length == 0) {
            console.log({ message: "NO Classes Found." })
            return res.status(404).json({ message: "NO Classes Found." })
        }
        return res.status(200).json({ message: teacherSubjects })

    }
    catch (error) {
        console.log(error.message,'from the GetClassSection Api Call.')
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
module.exports = { getClasslist, GetClassSection }