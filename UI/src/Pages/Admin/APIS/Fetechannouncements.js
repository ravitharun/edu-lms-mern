import axios from "axios"

export const Hnadlefetechannouncements = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/announcement/FetchAllAnnouncement")
        console.log(response.data.message,"API")
        return response.data.message
    } catch (error) {
        console.log(error)
    }
}