const mongoose = require("mongoose")
const AttandanceModel = mongoose.Schema({
    classID: { type: String, required: true },
    Section: { type: String, required: true },
    Subject: { type: String, required: true },
    Topic: { type: String, required: true },
    date: { type: String, required: true },
    Teacher_id: { type: String, required: true },
    attandance: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        Status: { type: String, required: true },
    }],
    summary: {
        total: { type: number },
        total_present: { type: number },
        total_Absent: { type: number }
    }

})
const AttanDanceSchema = new mongoose.model("AttandanceModel", AttandanceModel)
module.exports = { AttanDanceSchema }