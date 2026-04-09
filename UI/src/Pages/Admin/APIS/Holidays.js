import axios from "axios"
import { url } from "../../../Apis/Islogin"

export const FetchHolidays = async (page) => {

    try {
        const response = await axios.get(`${url}/api/Manageholiday/Holidays`, {
            params: {
                page: page
            }
        })
        return response
    } catch (error) {
        return error
    }
}