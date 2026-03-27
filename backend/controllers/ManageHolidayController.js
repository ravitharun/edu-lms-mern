
const { redisClient } = require("../Expose/redis");
const { AddHolidays } = require("../models/Holidays");

const AddholidaysBulk = async (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "No holiday data provided" });
    }
    await redisClient.del('Holidays')
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

const GetHolidays = async (req, res) => {
    try {
        let { page } = req.query;

        if (!page) {
            page = Number(page) || 1;
        }
        const limit = 2;
        const skip = (page - 1) * limit;
        const Holidays = await AddHolidays.find({})
            .skip(skip)
            .limit(limit);
        const total = await AddHolidays.countDocuments();
        if (Holidays.length === 0) {
            return res.status(404).json({ message: "No holidays Added Yet." });
        }
        const Data = {
            data: Holidays,
            total: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        }
        const cacheKey = `Holidays:page${page}`;
        // await redisClient.del(cacheKey)
        const CacheHolidays = await redisClient.get(cacheKey)
        if (CacheHolidays) { return res.status(200).json({ data: JSON.parse(CacheHolidays) }) }
        await redisClient.setEx(cacheKey, 300, JSON.stringify(Data))
        return res.status(200).json({
            data: Holidays,
            total: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "server error." });
    }
};

module.exports = { AddholidaysBulk, GetHolidays };