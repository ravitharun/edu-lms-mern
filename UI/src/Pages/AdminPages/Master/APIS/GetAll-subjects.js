import axios from "axios"

export const fetchAllSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/subjects/get/subjects")
        return response
    }
    catch (err) {
        console.log(err.message)
    }
}
export const fetchAllTeacherName = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/subjects/get/Teachers")
        return response
    }
    catch (err) {
        console.log(err.message)
    }
}
export const AssignTeacher= async (data) => {
    try {
        // const response = await axios.get("http://localhost:5001/api/subjects/get/Teachers")
        // return response
        console.log(data,'data')
    }
    catch (err) {
        console.log(err.message)
    }
}
