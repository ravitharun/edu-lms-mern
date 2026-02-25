import axios from "axios"

export const ApplyLeaveRequest = async(data) => {
    try {
        const response = await axios.post("http://localhost:5001/api/LeaveApply/ApplyLeave",{ApplyLeave:data})
        console.log(response.data.message)
        return response

    } catch (error) {
        console.log(error.message)
    }
}