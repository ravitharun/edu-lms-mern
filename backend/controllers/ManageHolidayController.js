const AddholidaysBulk = async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data, "data")
        if (!data) {
            console.log("data", data)
            return res.status(404).json({ message: "No" })
        }
        res.status(201).json({ message: data })


    } catch (error) {
        console.log("err : ", error?.message)
        return res.status(500).json({ message: "server error." })
    }



}
module.exports = { AddholidaysBulk }