

const StudentMarks = require("../models/MarksSchema")
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
        console.log(error.message,'err');

        return res.status(500).json({ message: 'server error..', status: false })

    }
}

module.exports = { AssiginMarks, fetchMarksByStudentId }