import axios from "axios"

export const ApplyLeaveRequest = async(data) => {
    try {
        const response = await axios.post("",{ApplyLeave:data})
        console.log(response.data.message)
        return response

    } catch (error) {
        console.log(error.message)
    }
}