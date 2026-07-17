

const StudentMarks = require("../models/MarksSchema")
const { getIO } = require("../socket")
const AssiginMarks = async (req, res) => {
    try {
        const io = getIO();

        const { data, sectionId } = req.body;

        const savedMarks = await StudentMarks.insertMany(data)


        const populatedMarks = await StudentMarks.find({
            _id: { $in: savedMarks.map(doc => doc._id) }
        }).populate("id");


        io.emit("marksUpdated", populatedMarks);

        return res.status(201).json({
            status: true,
            message: "Marks saved successfully.",
            data: savedMarks,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}


const fetchMarksByStudentId = async (req, res) => {
    try {
        const { Section } = req.query
        console.log(Section, 'Section');


        const data = await StudentMarks.find({ Semester: Section }).populate("id")

        console.log(data[0].subjectid, 'wdw');
        console.log(data, 'tharuns')


        return res.status(200).json({ message: 'Data Fetched...', data: data, status: true })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: 'server error..', status: false })

    }
}

module.exports = { AssiginMarks, fetchMarksByStudentId }