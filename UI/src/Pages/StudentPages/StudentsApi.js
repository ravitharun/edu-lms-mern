import axios from "axios"
import { url, Header_Token_expry } from "../../Apis/Islogin"

export const GetallSubjects = async (data) => {
    // try {
    try {
        const response = await axios.get(`${url}/api/AssignSubjects/get/subjects/${data}`,

            Header_Token_expry
        )
        return response
    } catch (error) {

        throw error
    }


}
