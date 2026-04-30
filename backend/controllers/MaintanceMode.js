const maintanceMode = async (req, res) => {
    try {
        const { data } = req.body

        if (data.Actiavte == null) {
            console.log({ message: "Activate Mode is required." })
            return res.status(404).json({ message: "Activate Mode is required." })
        }
        if (!data.ActivateTime || !data.ActivateText) {
            console.log({ message: "date and text is required." })
            return res.status(404).json({ message: "date and text is required." })
        }
        if (!data.Admin_Id) {
            return res.status(404).json({ message: "something went wrong" })
        }
        
        return res.status(200).json({ message: "Maintance Mode Activated." })
    } catch (error) {
        return res.status(500).json({ message: "server error." })
    }
}
module.exports = maintanceMode