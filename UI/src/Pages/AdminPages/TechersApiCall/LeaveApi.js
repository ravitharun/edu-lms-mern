import axios from "axios"
import { UserName } from "../../../Apis/Islogin"

export const ApplyLeaveRequest = async (data) => {
    try {
        const response = await axios.post("http://localhost:5001/api/LeaveApply/ApplyLeave", { ApplyLeave: data })
        console.log(response.data.message)
        return response

    } catch (error) {
        console.log(error.message)
    }
}


export const GetLeavesApplyByID = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/leaveApply/GetallLeavesdata", {
            params: {
                EmpID: UserName.teacher_Id,
                EmpEmail: UserName.email,
            }
        })
        console.log(response.data.message, 'near my api call ')
        return response
    } catch (error) {
        console.error(error.message, 'error')
    }
}


export const getRequestEmail = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/LeaveApply/Requeatemail', {
            params: {
                Referemail: UserName.email
            }
            ,

        })
        console.log(response.data.message)
        return response.data.message

    }
    catch (err) {
        console.log(err.message)
    }
}