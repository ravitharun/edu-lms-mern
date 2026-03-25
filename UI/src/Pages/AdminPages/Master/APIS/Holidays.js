import axios from "axios"

export const FetchHolidays = async (page) => {
    console.log(page,"page")
    try {
        const response = await axios.get("http://localhost:5001/api/Manageholiday/Holidays", {
            params: {
                page: page
            }
        })
        return response
    } catch (error) {
        return error
    }
}