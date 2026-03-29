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