const { subject } = require("../models/Master");
const User = require("../models/User");

const SubjectsSchemaController = async (req, res) => {
    try {
        const subjects = req.body; // array

        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "No subjects data" });
        }


        for (let i = 0; i < subjects.length; i++) {
            const findCourse = await subject.findOne({courseId:subjects[i].courseId})
            if (findCourse) {
                return res.status(400).json({ message: "course is already exits." })
            }

            if (!subjects[i].courseId) {
                return res.status(400).json({
                    message: `courseId missing at index ${i}`
                });
            }
        }
        // await subject.insertMany(subjects);
        res.status(201).json({
            message: "Subjects added successfully",
            count: subjects.length
        });

    } catch (err) {
        console.log(err.message, "error from subjects upload");
        return res.status(500).json({ message: err.message });
    }
};
 const fetchAllSubjects=async(req,res)=>{
    try{
        const data=await subject.find({})
        // const data=[]
        if(data.length==0){
            return res.status(404).json({message:"No Subjects."})
        }
        return res.status(201).json({message:data})

    }
    catch(err){
        console.log("err from the fetchAllSubjects",err.message)
        return res.status(500).json({message:"server Error"})
    }
}
 const fetchAllTeachers=async(req,res)=>{
    try{
        const data=await User.find({role: "Teacher"}).select("name teacher_Id")
        console.log(data,"data")
        if(data.length==0){
            console.log('No Subjects')
            return res.status(404).json({message:"No Subjects."})
        }
        return res.status(201).json({message:data})

    }
    catch(err){
        console.log("err from the fetchAllSubjects",err.message)
        return res.status(500).json({message:"server Error"})
    }
}

module.exports = { SubjectsSchemaController,fetchAllSubjects,fetchAllTeachers }