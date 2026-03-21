import axios from "axios"
import toast from "react-hot-toast"

export const AddTimetable = async (data) => {
    try {

        console.log(data, "data")
        const response = await axios.post("http://localhost:5001/api/academic/Add/TimeTable", { data: data })
        return response
    } catch (error) {
        console.log(error.message, "errr to add tt")

    }

}

export const FetchTimeTableByYear = async (Semester) => {
    try {
        console.log(Semester,"Semester")
        const reponse = await axios.get(`http://localhost:5001/api/academic/TimeTable?data=SEM1-1YEAR`)
        // const reponse = await axios.get(`http://localhost:5001/api/academic/TimeTable?data=${Semester}`)

        return reponse;
    } catch (error) {
        console.log(error.message, "get")

    }
}