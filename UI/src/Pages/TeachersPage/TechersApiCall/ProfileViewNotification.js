import axios from "axios";
import { url } from "../../../Apis/Islogin";

export const PostNotification = async (Viewid, viewedbyid) => {
    try {   
        const response = await axios.post(`${url}/api/ProfileViewnotification/Students`, {
            ViewID: Viewid,
            ViewedById: viewedbyid
        })
        return response
    } catch (error) {
        return error
    }
}