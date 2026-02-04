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
