const { redisClient } = require("../Expose/redis");
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

        let { page } = req.query
        let { limit } = req.query
        // console.log( ,'page')
        // let limit = 4
        let skip = 0;
        if (page == 0) {
            limit = 0;
            skip = 0;
        }
        else {

            skip = (page - 1) * limit
        }

        // if (!page) {
        //     page = Number(page) || 1;
        // }
        const data = await subject.find({}).skip(skip).limit(limit)
        const totalLength = await subject.countDocuments();
        if (data.length == 0) {
            return res.status(404).json({ message: "No Subjects." })
        }
        return res.status(201).json({ message: data, length: Math.ceil(totalLength / limit), currentPgae: page })

    }
    catch (err) {
        console.log("err from the fetchAllSubjects", err.message)
        return res.status(500).json({ message: "server Error" })
    }
}





const fetchAllTeachers = async (req, res) => {
    try {
        // 1️ Try to get cached data from Redis
        const cachedData = await redisClient.get("teachers");
        if (cachedData) {
            // If exists in cache, return it
            return res.status(200).json({
                message: JSON.parse(cachedData),
                source: "cache"
            });
        }

        // 2️ If not in cache, fetch from DB
        const data = await User.find({ role: "Teacher" }).select("name teacher_Id profilePreview");

        if (data.length === 0) {
            console.log('No Teachers found');
            return res.status(404).json({ message: "No Teachers found." });
        }

        // 3️ Store in Redis for future requests (500 seconds)
        await redisClient.setEx("teachers", 500, JSON.stringify(data));

        // 4️ Return fresh data
        return res.status(200).json({
            message: data,
            source: "database"
        });

    } catch (err) {
        console.log("Error:", err.message);
        return res.status(500).json({ message: "Server Error" });
    }
};
const fetchTeachersInfo = async (req, res) => {
    try {
        const { Page } = req.query;
        if (!Page) {
            Page = Number(Page) || 1
        }
        const limit = 4;
        let skip = (Page - 1) * limit
        const TotalDocuments = await User.find({ role: "Teacher" }).countDocuments()
        const data = await User.find({ role: "Teacher" }).skip(skip).limit(limit)
        const cachedData = await redisClient.get("myKey")
        console.log(cachedData,'cachedData Fetch All Techer')
        if (data.length == 0) {
            return res.status(404).json({ message: "No Subjects." })
        }
        if (cachedData) {
            return res.status(201).json({ message: JSON.parse(cachedData), length: Math.ceil(TotalDocuments / limit), currentpage: Number(Page) })
        }

        await redisClient.setEx("myKey", 500, JSON.stringify(data));
        return res.status(201).json({ message: data, length: Math.ceil(TotalDocuments / limit), currentpage: Number(Page) })
    }
    catch (err) {
        console.log("err from the fetchAllSubjects--->", err.message)
        return res.status(500).json({ message: "server Error" })
    }
}




const StudentsInfo = async (req, res) => {
    try {
        const { Page } = req.query;
        console.log(Page, "Page")
        if (!Page) {
            Page = Number(Page) || 1
        }
        const limit = 5;
        let skip = (Page - 1) * limit

        const TotalDocument = await User.find({ role: "student" }).countDocuments()
        const data = await User.find({ role: "student" }).skip(skip).limit(limit)
        if (data.length == 0) {
            console.log('No Subjects')
            return res.status(404).json({ message: "No Students." })
        }

        return res.status(201).json({ message: data, TotalDocument: Math.ceil(TotalDocument / limit), currentpage: Number(Page) })

    }
    catch (err) {
        console.log("err from the fetchAllSubjects", err.message)
        return res.status(500).json({ message: "server Error" })
    }
}





const addByOne = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, "Check Date From Ui")


        const check_isSubjects = await subject.find({ courseId: data.subjectCode })
        console.log(check_isSubjects)
        if (!check_isSubjects) {
            console.log('hi')
            return res.status(401).json("These Course ID is already Exits.")
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
        return res.status(500).json({ message: error.message })

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

module.exports = { SubjectsSchemaController, StudentsInfo, fetchAllSubjects, fetchAllTeachers, addByOne, DeleteCourse, fetchTeachersInfo }