import axios from "axios"
import { url } from "../../Apis/Islogin"
export const fetchSubjetcsMaterials = async (CourseId) => {
    try {
        const response = await axios.get(`${url}/api/UploadResources/fetchPdfs/CourseId`,{
            params: {
                CourseID: CourseId
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

