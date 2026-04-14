const { AttanDanceSchema } = require("../models/Attandance");

const MarkAttandance = async (req, res) => {
    try {
        const { Data } = req.body;
        // AttanDanceSchema

    } catch (error) {
        return res.status(500).json({ message: "server Error." })

    }
}
module.exports = { MarkAttandance }