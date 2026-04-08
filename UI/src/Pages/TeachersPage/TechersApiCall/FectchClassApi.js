import axios from "axios"
import { UserName } from "../../../Apis/Islogin"

export const FetchClassByTecherId = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/classlist/getsection', {

            params: {
                teacher_Id: UserName.teacher_Id
            }
        })
        return response;
    } catch (error) {
        return error;

    }

}
export const GetStudentname = async (ClassID, getByclass) => {
    console.log({ ClassID, getByclass }, 'ClassID')
    try {

        const response = await axios.get('http://localhost:5001/api/markAttandance/StudentsAttandance', {

            params: {
                ClassID: getByclass == "" ? ClassID : getByclass
            }
        })
        return response;
    } catch (error) {
        return error;

    }

}