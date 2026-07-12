import axios from "axios"
import { url, UserName } from "../../../Apis/Islogin"

export const FetchClassByTecherId = async () => {
    try {
        const response = await axios.get(`${url}/api/classlist/getsection`, {

            params: {
                teacher_Id: UserName.teacher_Id
            }
        })
        return response;
    } catch (error) {
        throw error;

    }

}
export const GetStudentname = async (ClassID, getByclass) => {
    console.log({ ClassID, getByclass }, 'ClassID')
    try {

        const response = await axios.get(`${url}/api/markAttandance/StudentsAttandance`, {

            params: {
                ClassID: getByclass == "" ? ClassID : getByclass
            }
        })
        return response;
    } catch (error) {
        throw error;

    }

}