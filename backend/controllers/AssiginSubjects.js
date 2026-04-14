const leaveAcceptEmail = require("../Email/textEmail");
const subjectWiseTeacherSchema = require("../models/subjectwiseteacher");

const SubjectAddByteacher = async (req, res) => {
    try {
        const { data } = req.body

        const year = data.ChooseSubjects.split("-")[2]
        const subject = data.ChooseSubjects.split("-")[0]
        const dept = data.ChooseSubjects.split("-")[1]
        const courseID = data.ChooseSubjects.split("-")[3]
        const techer_Name = data.ChooseTecherName.split("@")[0];
        const id = data.ChooseTecherName.split("@")[1];
        const ulr = data.ChooseTecherName.split("@")[2];
        const findByclassid = await subjectWiseTeacherSchema.findOne({ classId: data.classid })
        const isassigned = await subjectWiseTeacherSchema.findOne({ "subjects.subjectId": courseID })

        // if courseid is alredy assigned to the class 
        if (isassigned) {
            return res.status(400).json({ message: "Course is already Assigned." })
        }

        // check the class id and push into that
        if (findByclassid == null) {
            const add = new subjectWiseTeacherSchema({
                classId: dept + year,
                department: dept,
                year: year,
                subjects: [
                    {
                        subjectId: courseID,
                        subjectName: subject,
                        name: techer_Name,
                        teacherId: id,
                        Techer_profile: ulr,
                        Assign: true
                    },
                ]

            })

            return await add.save()
        }

        // else it checks the class id and add into it 
        const addByclassid = await subjectWiseTeacherSchema.findOneAndUpdate({ classId: data.classid },
            {
                $push: {
                    subjects: {
                        subjectId: courseID,
                        subjectName: subject,
                        teacherId: id,
                        name: techer_Name,
                        Techer_profile: ulr,
                        Assign: true

                    }
                }
            }, { upsert: true, new: true }
        )

        await addByclassid.save()

        return res.status(201).json({ message: "Assigned." })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server error while assigning the subjects." })
    }
}


const GetallAssignedSubjects = async (req, res) => {
    try {
        const GetAllAssignedSubjects = await subjectWiseTeacherSchema.find({})
        if (GetAllAssignedSubjects.length == 0) {
            return res.status(404).json({ message: "No Subjects Assigned ." })
        }

        return res.status(200).json({ message: GetAllAssignedSubjects })
    } catch (error) {
        console.log(error.message, "from the GetAllAssignedSubjects api call")
        returnres.status(500).json({ message: 'server error' })
    }
}


const GetSubjectsByclassID = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(409).json({ message: "ID is Missing." })
        }

        const GetSubjects = await subjectWiseTeacherSchema.findOne({ classId: id })
        if (GetSubjects == null) {
            return res.status(404).json({ message: "No Subjects Found." })
        }
        if (!GetSubjects) {
            return res.status(404).json({ message: "No classId found" })
        }
        return res.status(200).json({ message: GetSubjects })
    } catch (error) {
        console.log(error.message, 'err from the get all subjects by classID:)')
        return res.status(500).json({ message: "server Error" })

    }


}

const UnassiginTeacherBySubjetcts = async (req, res) => {
    try {
        const { id, techerid, action } = req.body
        let check = action == 'assign' ? true : false
        if (!techerid || !id) return res.status(404).json({ message: "ID is Missing." })
        const getByID = await subjectWiseTeacherSchema.findOneAndUpdate(
            {
                _id: id,
                "subjects.teacherId": techerid
            },
            {
                $set: { "subjects.$.Assign": check }
            },
            { new: true }
        );

        if (!getByID) {
            return res.status(404).json({ message: "Assigned Subject's Not Found." })
        }
        console.log('The teacher has been successfully unassigned from this subject."')
        if (action === 'assign') {

            return res.status(200).json({ message: `The teacher has been successfully ${action} from this subject.` })
        }
        return res.status(200).json({ message: `The teacher has been successfully ${action} from this subject.` })
    } catch (error) {
        console.log(error.message, 'err')
        return res.status(500).json({ message: "server error." })

    }
}

module.exports = { SubjectAddByteacher, GetallAssignedSubjects, GetSubjectsByclassID, UnassiginTeacherBySubjetcts }