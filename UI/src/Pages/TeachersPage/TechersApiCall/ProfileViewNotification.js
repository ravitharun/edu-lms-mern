import axios from "axios";

export const Get = async (Viewid, viewedbyid) => {
    console.log({Viewid, viewedbyid})
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