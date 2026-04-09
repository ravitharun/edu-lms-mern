import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import secureLocalStorage from "react-secure-storage";
import { url } from './Islogin';
// import { url } from './Islogin';
// console.log(import.meta.env.Api_region === "Local" ? import.meta.env.VITE_API_URL : import.meta.env.Server_api_Url, 'url from the login.js file')
const handelapiSigup = async (formData, e) => {
  e.preventDefault()

  const response = await axios.post(
    `${url}/api/auth/newDataUser`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );



  secureLocalStorage.setItem("Token", response.data.token)
  console.log(response, 'response')
  return response

  // console.log(error.message, 'err New account.')


}
const handelLogin = async (data, e) => {
  try {
    e.preventDefault()
    const get_token = secureLocalStorage.getItem("token")
    const response = await axios.get(`${url}/api/auth/LoginAccount`, {

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



    secureLocalStorage.setItem("token", response.data.
      token)
    secureLocalStorage.setItem("User_info", response.data.
      user)


    return response
  } catch (error) {
    return error

  }
}

export { handelapiSigup, handelLogin }