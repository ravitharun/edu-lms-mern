import axios from "axios";
import { url } from "../../../Apis/Islogin";

export const PostNotification = async (Viewid, viewedbyid) => {
    console.log({ Viewid, viewedbyid })
    try {   
        const response = await axios.post(`${url}/api/ProfileViewnotification/Students`, {
            ViewID: Viewid,
            ViewedById: viewedbyid
        })
        console.log(response,'response')
        return response
    } catch (error) {
        return error
    }
}