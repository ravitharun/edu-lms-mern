const SubjectAddByteacher = async (req, res) => {
    try {
        const { data } = req.body
        const classId = "Cs-3"
        console.log(data)
        const year = data.ChooseSubjects.split("-")[2]
        const subject = data.ChooseSubjects.split("-")[0]
        const dept = data.ChooseSubjects.split("-")[1]
        const courseID = data.ChooseSubjects.split("-")[3]
        const parts = data.ChooseTecherName.split(" - ")[0];
        const name = parts.split(",")[0]
        const Techerid = parts.split(",")[1]
        const profileUrl = parts.split(",")[2]


        console.log(
            {
                year,
                classId,
                dept,

                "subjects": {
                    subject,
                    courseID,
                    "teacherAssigned":{
                        Techerid,
                        profileUrl
                    }

                }


            }
        )


        return res.status(201).json({ message: "Done." })
    } catch (error) {
        return res.status(500).json({ message: "server error while assigning the subjects." })
    }
}
module.exports = { SubjectAddByteacher }