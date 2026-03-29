const mongoose = require("mongoose")
const handelAcademicSchema = new mongoose.Schema
    ({
        EventName: { type: String, required: true },
        EventstartDate: { type: Date, required: true },
        EventendDate: { type: Date, required: true },
        Eventtype: { type: String, required: true },
        Addbyname: { type: String, required: true },
        Addbyid: { type: String, required: true },
        AddByrole: { type: String, required: true },
        Descprition: { type: String, required: true, default: "No Descprition Added Yet For These" },


    })

const AddAcademicSchema = mongoose.model("AcademicSchema", handelAcademicSchema);
module.exports = { AddAcademicSchema }