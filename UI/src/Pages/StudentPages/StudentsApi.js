import axios from "axios"

export const GetallSubjects = async (data) => {
    // try {
    const response = await axios.get(`http://localhost:5001/api/AssignSubjects/get/subjects/${data}`)
    return response


}
