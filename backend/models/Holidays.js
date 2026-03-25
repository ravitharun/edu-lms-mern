const mongoose = require("mongoose")
const Holiadays = new mongoose.Schema({
    // { text: "Holiday 1", start: "2026-03-25", type: "Govt Holiday" },
    text: { type: String, default: "Holiday" },
    start: { type: String, default: Date.now(), required: true },
    type: { type: String, default: "Govt Holiday" }
})
const AddHolidays = mongoose.model("ManageHoildays", Holiadays)
module.exports = { AddHolidays }