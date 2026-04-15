import axios from "axios"
import { url, UserName } from "../../../Apis/Islogin"

export const ApplyLeaveRequest = async (data) => {
    try {
        const response = await axios.post(`${url}/api/LeaveApply/ApplyLeave`, { ApplyLeave: data })
        return response

    } catch (error) {
        console.log(error.message)
    }
}


export const GetLeavesApplyByID = async () => {
    try {
        const response = await axios.get(`${url}/api/leaveApply/GetallLeavesdata`, {
            params: {
                EmpID: UserName.teacher_Id,
                EmpEmail: UserName.email,
            }
        })
        return response
    } catch (error) {
        return error
        // console.error(error.message, 'error')
    }
}


export const getRequestEmail = async () => {
    try {
        const response = await axios.get(`${url}/api/LeaveApply/Requeatemail`, {
            params: {
                Referemail: UserName.email
            }
            ,

        })
        return response.data.message

    }
    catch (err) {
        return err
    }
}