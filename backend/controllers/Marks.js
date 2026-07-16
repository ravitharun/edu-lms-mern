

const StudentMarks = require("../models/MarksSchema")
const AssiginMarks = async (req, res) => {
    try {

        const { data } = req.body
        console.log(data, 'data');
        const Save_studentMarks = await StudentMarks.insertMany(data)

        return res.status(201).json({ message: 'Marks Saved...',status:true })


    } catch (error) {
        console.log(error.message, 'check err ');

        return res.status(500).json({ message: 'server error..',status:!1 })
    }
}


const fetchMarksByStudentId=async(req,res)=>{
    try {
        
        return res.status(200).json({ message: 'Data Fetched...',status:true })
    } catch (error) {
        return res.status(500).json({ message: 'server error..',status:!1 })
        
    }
}

module.exports = {AssiginMarks,fetchMarksByStudentId}