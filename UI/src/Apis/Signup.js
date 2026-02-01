import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import secureLocalStorage from "react-secure-storage";

const handelapiSigup = async (data, e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`http://localhost:5001/api/auth/newDataUser`, { formdata: data })
    secureLocalStorage.setItem("Token", response.data.token)
    return response
  } catch (error) {

  }
}
const handelLogin = async (data, e) => {
  try {
    e.preventDefault()
    const get_token = secureLocalStorage.getItem("token")
    const response = await axios.get(`http://localhost:5001/api/auth/LoginAccount`, {
      params: {
        email: data.StudentEmail,
        Password: data.StudentPassword,
        role: data.role
      }
      ,
      headers: {
        'Authorization': `Bearer ${get_token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.data.message == "The password is incorrect") {
      return toast.error("The password is incorrect")
    }

    secureLocalStorage.setItem("token", response.data.
      token)
    secureLocalStorage.setItem("Role", response.data.
      user.role)
    console.log(response, 'response')
    return response
    // return response
  } catch (error) {
    // console.log(error.message)
    toast.error(error?.message)

  }
}

export { handelapiSigup, handelLogin }