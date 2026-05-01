import axios from "axios"
import { url } from "../../../Apis/Islogin"

export const FetchMaintanceMode = async () => {
    try {
        const response = await axios.get(`${url}/api/maintanceMode/FetchMode`)
        return response

    } catch (error) {
        throw error

    }
}

export const HandelUpdate = async (data) => {
    try {
        const response = await axios.patch(`${url}/api/maintanceMode/UpdateMode`, { data: data })
        return response
    } catch (error) {
        throw error
    }
}
