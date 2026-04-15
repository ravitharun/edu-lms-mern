import axios from "axios"
import { url } from "../../Apis/Islogin";

export const Getdata =async () => {
    const response = await axios.get
        (`${url}/api/Academic/get/AcademicDetails`)
    return response;
}