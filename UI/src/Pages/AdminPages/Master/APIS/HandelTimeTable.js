import axios from "axios"

export const AddTimetable = async (data) => {
    try {
        
        console.log(data, "data")
        const response = await axios.post("http://localhost:5001/api/academic/Add/TimeTable", { data: data })
        return response
    } catch (error) {
        console.log(error.message, "errr to add tt")

    }

}