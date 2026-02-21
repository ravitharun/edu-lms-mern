import axios from "axios"

export const GetallSubjects = async (data) => {
    // try {
    console.log(data, 'data')
    const response = await axios.get(`http://localhost:5001/api/AssignSubjects/get/subjects/${data}`)
    console.log(response, 'response_subjectsByClassID')
    return response


}
