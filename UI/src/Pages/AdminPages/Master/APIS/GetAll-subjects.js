import axios from "axios"
import { handleLogout, UserLogin, Header_Token_expry } from "../../../../Apis/Islogin"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

export const fetchAllSubjects = async (page) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/subjects/get/subjects?page=${(page)}`, Header_Token_expry)
        console.log(response, "response")
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

        const response = await axios.post("http://localhost:5001/api/AssignSubjects/assign/subjects", { data: data }, Header_Token_expry)
        console.log(response)

    }
    catch (err) {
        console.log()
        if (err.message == 'Request failed with status code 400') {
            return alert('Course is already Assigned. ')
        }

    }
}
export const AddnewSubjuect = async (data) => {

    const response = await axios.post("http://localhost:5001/api/subjects/add/subjectByForm", { data: data },

        Header_Token_expry

    )

    console.log(response.data, 'res')
    return response;


}
export const HandelDeleteCourse = async (data) => {

    // try {?
    const response = await axios.delete(`http://localhost:5001/api/subjects/delete/Course/${data}`,

        Header_Token_expry

    )



    return response;



}


// get all assigned subjects from techer 
export const GetAllSubjectsAssignedTeacher = async () => {
    const response = await axios.get("http://localhost:5001/api/AssignSubjects/assign/AllSubjects", Header_Token_expry)

    return response.data.message
}


export const GetallTeacherProfile = async (Page) => {

    try {
        console.log(Page, "Page")
        const response = await axios.get(`http://localhost:5001/api/subjects/get/TeachersInfo?Page=${Page}`,
            Header_Token_expry
        )

        return response

    } catch (error) {
        if (error.response.data.message === "Token expired") {
            handleLogout()
        }

    }

}
export const GetallStudentsProfile = async (Page) => {

    try {
     
        const response = await axios.get(`http://localhost:5001/api/subjects/get/StudentsInfo?Page=${Page}`,
            Header_Token_expry
        )
        console.log(response,)

        return response

    } catch (error) {
        if (error.response.data.message === "Token expired") {
            handleLogout()
        }

    }

}
export const HandelUnassignApi = async (id, techerid, type, action) => {
    const info = { id, techerid, type, action }
    console.log(info, 'id From api Call')

    try {
        const response = await axios.delete("http://localhost:5001/api/AssignSubjects/Delete/AssiginSubjects", {

            data: info

        },
        )

        return response

    } catch (error) {
        if (error.response.data.message === "Token expired") {
            handleLogout()
        }

    }

}


