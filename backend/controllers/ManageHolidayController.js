const { AddHolidays } = require("../models/Holidays");

const AddholidaysBulk = async (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "No holiday data provided" });
    }

    try {


        // ✅ Insert
        const addedHolidays = await AddHolidays.insertMany(data, {
            ordered: false,
        });

        return res.status(201).json({
            message: "Holidays added successfully",
            addedCount: addedHolidays.length,
            skippedCount: data.length - addedHolidays.length,
            data: addedHolidays
        });

    } catch (error) {

        if (error?.code == 11000) {
            return res.status(409).json({ message: "Duplicate dates found (skipped)" })
        }
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { AddholidaysBulk };