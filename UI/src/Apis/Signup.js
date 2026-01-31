import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const handelapiSigup = async (data, e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`http://localhost:5001/api/auth/newDataUser`, { formdata: data })
    return response
  } catch (error) {

  }
}
const handelLogin = async (data, e) => {
  try {
    e.preventDefault()
    const response = await axios.get(`http://localhost:5001/api/auth/LoginAccount`, {
      params: {
        email: data.StudentEmail,
        Password: data.StudentPassword,
        role: data.role
      }
    })
    if(response.data.message=="The password is incorrect"){
      return toast.error("The password is incorrect")
    }
    return response


    // return response
  } catch (error) {
    // console.log(error.message)
    toast.error(error?.message)

  }
}

export { handelapiSigup, handelLogin }