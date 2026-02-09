const subjectWiseTeacherSchema = require("../models/subjectwiseteacher");

const SubjectAddByteacher = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data.classid)
        const year = data.ChooseSubjects.split("-")[2]
        const subject = data.ChooseSubjects.split("-")[0]
        const dept = data.ChooseSubjects.split("-")[1]
        const courseID = data.ChooseSubjects.split("-")[3]
        const techer_Name = data.ChooseTecherName.split("@")[0];
        const id = data.ChooseTecherName.split("@")[1];
        const ulr = data.ChooseTecherName.split("@")[2];
        const findByclassid = await subjectWiseTeacherSchema.findOne({ classId: data.classid })
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
                        Techer_profile: ulr
                    },
                ]

            })

            return await add.save()
        }


        const addByclassid = await subjectWiseTeacherSchema.findOneAndUpdate({ classId: data.classid },

            {
                $push: {
                    subjects: {
                        subjectId: courseID,
                        subjectName: subject,
                        teacherId: id,
                        name: techer_Name,
                        Techer_profile: ulr

                    }
                }
            }, { upsert: true, new: true }
            
        )
        console.log('add based on the class ID')
        await addByclassid.save()


        console.log('added the subject.')

        return res.status(201).json({ message: "Done." })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server error while assigning the subjects." })
    }
}
module.exports = { SubjectAddByteacher }