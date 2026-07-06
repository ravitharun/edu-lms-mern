const cloudinary = require("../config/cloudinary");
const uploadAssigment = require("../models/Assigment");

const CreateAssignments = async (req, res) => {




    try {
        const { AddedBy, Mark, Duedate, AssignmentName, section, SUbjectsId } = req.body


        console.log(AddedBy, 'AddedBy')
        console.log(Mark, 'body')
        console.log(Duedate, 'body')
        console.log(AssignmentName, 'body')
        console.log(section, 'section')
        console.log(SUbjectsId, 'SUbjectsId')
        console.log(req.file, 'file')

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
            Section: section,
            subjectId: SUbjectsId,
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

        console.log(error, 'error')
        return res.status(500).json({ message: "server error." })

    }
}
const FetchAssignments = async (req, res) => {
    try {

        const { section } = req.query



        const data = await uploadAssigment.find({ Section: section })
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


        console.log(req.body)
        console.log(req.files)

        return res.status(201).json({ message: "Assignments submited." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error." })

    }
}



const ValidateAssignments = async (req, res) => {
    try {


        console.log(req.body)
        console.log(req.files)

        return res.status(201).json({ message: "Assignments submited." })

    } catch (error) {
        return res.status(500).json({ message: "server error." })

    }
}





module.exports = { CreateAssignments, FetchAssignments, SubmitAssignments, ValidateAssignments }