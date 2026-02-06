const { subject } = require("../models/Master");
const User = require("../models/User");

const SubjectsSchemaController = async (req, res) => {
    try {
        const subjects = req.body; // array
        // console.log(subjects, 'subjects')
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "No subjects data" });
        }
        for (let i = 0; i < subjects.length; i++) {
            const findCourse = await subject.findOne({ courseId: subjects[i].courseId })
            if (findCourse) {
                return res.status(400).json({ message: "course is already exits." })
            }

            if (!subjects[i].courseId) {
                return res.status(400).json({
                    message: `courseId missing at index ${i}`
                });
            }
        }
        await subject.insertMany(subjects);
        res.status(201).json({
            message: "Subjects added successfully",
            count: subjects.length
        });

    } catch (err) {
        console.log(err.message, "error from subjects upload");
        return res.status(500).json({ message: err.message });
    }
};
const fetchAllSubjects = async (req, res) => {
    try {
        const data = await subject.find({})
        const authorizationToken = req.headers['authorization'];
        // const data=[]
        if (data.length == 0) {
            return res.status(404).json({ message: "No Subjects." })
        }
        return res.status(201).json({ message: data })

    }
    catch (err) {
        console.log("err from the fetchAllSubjects", err.message)
        return res.status(500).json({ message: "server Error" })
    }
}

const fetchAllTeachers = async (req, res) => {
    try {
        const data = await User.find({ role: "Teacher" }).select("name teacher_Id")
        console.log(data, "data")
        if (data.length == 0) {
            console.log('No Subjects')
            return res.status(404).json({ message: "No Subjects." })
        }
        return res.status(201).json({ message: data })

    }
    catch (err) {
        console.log("err from the fetchAllSubjects", err.message)
        return res.status(500).json({ message: "server Error" })
    }
}
const addByOne = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data)
        // { subjectName: 'efk', subjectCode: '212', year: '12', dept: 'rfmr' }

        const check_isSubjects = await subject.find({ courseId: data.subjectCode })
        console.log(check_isSubjects)
        if (!check_isSubjects) {
            return res.status(401).json({ message: "These Course ID is already Exits." })
        } else {


            const addSubject_new = new subject({
                subject: data.subjectName,
                courseId: data.subjectCode,
                department: data.dept,
                year: data.year,
            })
            await addSubject_new.save()
            return res.status(201).json({ message: "Subject is added." })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: err.message })

    }
}


const DeleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            console.log('ID is missing. from the delete route Course')
            return res.status(404).json({ message: "ID is missing." })
        }
        const Delete_course = await subject.findByIdAndDelete(id)
        if (Delete_course) {

            return res.status(200).json({ message: "Course Deleted." })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = { SubjectsSchemaController, fetchAllSubjects, fetchAllTeachers, addByOne, DeleteCourse }