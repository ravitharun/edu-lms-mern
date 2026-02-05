import axios from "axios"
import { handleLogout, UserLogin, Header_Token_expry } from "../../../../Apis/Islogin"
import toast from "react-hot-toast"

export const fetchAllSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/subjects/get/subjects", Header_Token_expry)
        return response
    }
    catch (err) {
        console.log(err, 'err')
        if (err.status == 401) {
            handleLogout()
            return window.location.href = "/login"
        }
    }
}
export const fetchAllTeacherName = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/subjects/get/Teachers",
            Header_Token_expry
        )
        return response
    }
    catch (err) {
        console.log(err.message)
    }
}
export const AssignTeacher = async (data) => {
    try {
        // const response = await axios.get("http://localhost:5001/api/subjects/get/Teachers")
        // return response
        console.log(data, 'data')
    }
    catch (err) {
        console.log(err.message)
    }
}
