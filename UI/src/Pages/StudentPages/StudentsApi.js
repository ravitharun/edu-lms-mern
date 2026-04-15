import axios from "axios"
import { url } from "../../Apis/Islogin"

export const GetallSubjects = async (data) => {
    // try {
    const response = await axios.get(`${url}/api/AssignSubjects/get/subjects/${data}`)
    return response


}
