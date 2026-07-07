const cloudinary = require("../config/cloudinary");
const uploadAssigment = require("../models/Assigment");
const { v4: uuidv4 } = require("uuid");
const UploadassignmentModel = require("../models/studentsAssignmentSubmission");
// CreateAssignments
const CreateAssignments = async (req, res) => {
    try {
        const { AddedBy, Mark, Duedate, AssignmentName, section, SUbjectsId } = req.body

        const id = req.body.section.split("-").pop().trim();
        const CourseCode = req.body.section.trim().split("-")[3].trim()
        const Section = section.substring(0, section.lastIndexOf("-")).trim();

        console.log(CourseCode, 'CourseCode')
        console.log(id, 'id')
        console.log(Section, 'Section')





        if (!req.file) {
            return res.status(404).json({ message: "File is required." })

        }

        if (!AddedBy || !Mark || !Duedate || !AssignmentName || !section || !SUbjectsId) {


            return res.status(404).json({ message: "Some inputs Are missing" })
        }

        const securl_url = await cloudinary.uploader.upload(req.file.path)
        console.log(securl_url.secure_url, 'securl_url');

        // Db save it 
        const saveDb = new uploadAssigment({
            assignmentId: uuidv4(),
            Section: Section,
            subjectId: id,
            CourseCode: CourseCode,
            AssignementName: AssignmentName,
            Assignementurl: securl_url.secure_url,
            DueDate: Duedate,
            Marks: Mark,
            Addedby: AddedBy
        })
        await saveDb.save()




        console.log("DB Saved....")
        return res.status(201).json({ message: "Assignments Uploaded." })

    } catch (error) {

        console.log(error.message, 'error')
        return res.status(500).json({ message: "server error." })

    }
}

// FetchAssignments
const FetchAssignments = async (req, res) => {
    try {

        const { section, studentid } = req.query
        console.log(req.query, 'Section req')
        // const MarksData = await uploadAssigment.find({ StudentsIdSubmitted: studentid })

        const data = await uploadAssigment.find({

            $or: [
                { Section: section },
                { CourseCode: section },
                { StudentsIdSubmitted: studentid }
            ]
        }).populate("Addedby").populate("assignmentId").populate("StudentsIdSubmitted").populate("SubmittedAssignments")
        console.log("data", data)
        if (data.length == 0) {
            return res.status(200).json({ message: "No Resuroces Found", data: [] })
        }

        return res.status(201).json({ message: "Assignments FetchAssignments.", data: data })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error." })

    }
}


const SubmitAssignments = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).json({ message: "File Is required." })
        }



        const checkIsStudentUploaded = await UploadassignmentModel.findOne({

            studentId: req.body.StudentId,
            subjectid: req.body.subjectid,
        });
        console.log(checkIsStudentUploaded, 'checkIsStudentUploaded')
        if (checkIsStudentUploaded) {
            return res.status(409).json({
                success: false,
                message: "You have already submitted this assignment.",
            });
        }





        const url = await cloudinary.uploader.upload(req.file.path)
        const assignement = new UploadassignmentModel({
            year: req.body.StudentsYearDepartment,
            assignmentId: req.body.assignmentId,
            submissionassignmentId: uuidv4(),
            subjectid: req.body.subjectid,
            CourseCode: req.body.CourseCode,
            feedback: req.body.feedback,
            studentId: req.body.StudentId,
            submissionUrl: url.secure_url,
            submittedAt: Date.now()


        })
        console.log(assignement, 'tharunassignement')

        const Updatedsubmissions = await uploadAssigment.findOneAndUpdate({ assignmentId: req.body.assignmentId }, {
            $inc: {
                totalSubmissions: 1
            },
            $push: {
                StudentsIdSubmitted: req.body.StudentId,
                SubmittedAssignments: assignement._id
            }
        })
        await assignement.save()
        return res.status(201).json({ message: "Assignments submited." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error." })

    }
}

const GetSubmissions = async (req, res) => {
    try {
        const { id } = req.query
        if (!id) {
            return res.status(404).json({ message: "No id found" })
        }
        console.log(id, 'checkid')


        // Db fetch it
        const response = await UploadassignmentModel.find({
            assignmentId: id,
        }).populate({
            path: "studentId",
            select:
                "name email profilePreview AccountStatus isActive StudentsYearDepartment department Student_ID",
        });
        console.log(response, 'response')
        if (!response) {
            return res.status(404).json({ messsage: "No student Submitted." })
        }
        return res.status(200).json({ message: "fetched", data: response })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server error" })

    }
}

const ValidateAssignments = async (req, res) => {
    try {

        const { UpdatedStatus, updateMarks, Student_ID, assignementId, TotalMarks } = req.body.data
        console.log(UpdatedStatus, updateMarks, Student_ID, assignementId)

        const studentAssignementfindUpdate = await UploadassignmentModel.findOneAndUpdate({ studentId: Student_ID, assignmentId: assignementId }, {
            $set: {
                obtainedMarks: updateMarks,
                status: UpdatedStatus,
                TotalMarks: TotalMarks
            }
        }, { returnDocument: "after" })
        console.log(studentAssignementfindUpdate, 'studentAssignementfindUpdate')
        return res.status(201).json({ message: "Student assignment validated successfully." })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server error." })

    }
}

const fetchMarksByStudentId = async (req, res) => {
    try {
        // const { studentid } = req.query
        const studentid = "6a4b21b2302a114dd21eb117"

        console.log(studentid, 'studentid')

        const MarksData = await uploadAssigment.find({ StudentsIdSubmitted: studentid }).populate("assignmentId").populate("StudentsIdSubmitted").populate("SubmittedAssignments")
        console.log(MarksData, 'MarksData')
        return res.status(200).json({ message: 'fetching The Marks', data: MarksData })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'server error', err: error })

    }
}



module.exports = { CreateAssignments, FetchAssignments, SubmitAssignments, ValidateAssignments, GetSubmissions, fetchMarksByStudentId }