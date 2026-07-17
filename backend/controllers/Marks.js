

const StudentMarks = require("../models/MarksSchema")
const AssiginMarks = async (req, res) => {
    try {

        const { data } = req.body
        const Save_studentMarks = await StudentMarks.insertMany(data)

        return res.status(201).json({ message: 'Marks Saved...', status: true })


    } catch (error) {
        console.log(error.message, 'check err ');

        return res.status(500).json({ message: 'server error..', status: !1 })
    }
}


const fetchMarksByStudentId = async (req, res) => {
    try {
        const { Section } = req.query
        console.log(Section, 'Section');
        // console.log(Section.trim(),'Section.trim()');


        const data = await StudentMarks.find({ Semester: Section }).populate("id")
        // .populate("subjectid")
        console.log(data[0].subjectid, 'wdw');
        console.log(data, 'tharuns')


        return res.status(200).json({ message: 'Data Fetched...', data: data, status: true })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: 'server error..', status: false })

    }
}

module.exports = { AssiginMarks, fetchMarksByStudentId }