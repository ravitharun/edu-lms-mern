import axios from "axios"
import { url } from "../../../Apis/Islogin"

export const Hnadlefetechannouncements = async () => {
    try {
        const response = await axios.get(`${url}/api/announcement/FetchAllAnnouncement`)
        return response.data.message
    } catch (error) {
        console.log(error)
    }
}