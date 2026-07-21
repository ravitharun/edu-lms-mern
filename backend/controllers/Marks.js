

const StudentMarks = require("../models/MarksSchema")
const SubjectWiseTeachers = require("../models/subjectwiseteacher")
const { getIO } = require("../socket")


const AssiginMarks = async (req, res) => {
    try {
        const io = getIO();

        const { data } = req.body;

        const savedMarks = await StudentMarks.insertMany(data);

        const populatedMarks = await StudentMarks.find({
            _id: { $in: savedMarks.map(doc => doc._id) }
        }).populate("id");

        io.emit("marksUpdated", populatedMarks);

        return res.status(201).json({
            status: true,
            message: "Marks saved successfully.",
            data: populatedMarks,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};



const fetchMarksByStudentId = async (req, res) => {
    try {
        const { Section } = req.query



        const data = await StudentMarks.find({ Semester: Section }).populate("id")



        return res.status(200).json({ message: 'Data Fetched...', data: data, status: true })
    } catch (error) {
        console.log(error.message, 'err');

        return res.status(500).json({ message: 'server error..', status: false })

    }
}



const FetchBySingleStudentId = async (req, res) => {

    try {



        const { semseter, studentid } = req.query
        console.log(req.query, 'studentid');








        const marks = await StudentMarks.find({
            id: studentid,
            Semester: semseter
        }).populate("id");




        // const 

        if (marks.length == 0) {


            return res.status(404).json({
                message: `No records found for Semester ${semseter}.`,
                status: false
            });
        }
        const result = [];

        for (const mark of marks) {
            const subjectInfo = await SubjectWiseTeachers.findOne({
                "subjects._id": mark.subjectid
            });

            const subject = subjectInfo?.subjects.find(
                s => s._id.toString() === mark.subjectid.toString()
            );

            const obj = mark.toObject();
            obj.subjectid = subject;

            result.push(obj);
        }

        console.log(result.length, 'result');
        console.log(result, 'result');

        return res.status(200).json({ message: result, status: true })

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({ message: "server error", status: false })
    }
}

module.exports = { AssiginMarks, fetchMarksByStudentId, FetchBySingleStudentId }