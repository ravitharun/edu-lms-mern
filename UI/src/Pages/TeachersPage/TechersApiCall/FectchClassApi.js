import axios from "axios"
import { Header_Token_expry, url, UserRole } from "../../../Apis/Islogin"

export const FetchClassByTecherId = async () => {
    try {
        const response = await axios.get(`${url}/api/classlist/getsection`, {
           ... Header_Token_expry,

            params: {
                teacher_Id: UserRole.teacher_Id
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
            Header_Token_expry,

            params: {
                ClassID: getByclass == "" ? ClassID : getByclass
            }
        })
        return response;
    } catch (error) {
        throw error;

    }

}