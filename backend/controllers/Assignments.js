 const CreateAssignments = async (req, res) => {




    try {



        console.log(req.body)
        console.log(req.files)


        return res.status(201).json({ message: "Assignments Uploaded." })

    } catch (error) {
        return res.status(500).json({ message: "server error." })

    }
}
 const FetchAssignments = async (req, res) => {
    try {

        const { data } = req.query

        console.log(data,'data')

        return res.status(201).json({ message: "Assignments FetchAssignments." })

    } catch (error) {
        return res.status(500).json({ message: "server error." })

    }
}
 const SubmitAssignments = async (req, res) => {
    try {

      
        console.log(req.body)
        console.log(req.files)

        return res.status(201).json({ message: "Assignments submited." })

    } catch (error) {
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





module.exports = { CreateAssignments, FetchAssignments,SubmitAssignments,ValidateAssignments }