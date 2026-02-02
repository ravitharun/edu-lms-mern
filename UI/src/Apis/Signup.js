import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import secureLocalStorage from "react-secure-storage";

const handelapiSigup = async (formData, e) => {
  e.preventDefault()
  try {
    for (let [key, value] of formData.entries()) {
      console.log("Ui form data", key, value);
    }
    const response = await axios.post(
      "http://localhost:5001/api/auth/newDataUser",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    for (let [key, value] of formData.entries()) {
      console.log("UI form data:", key, value);
      // Note: `value` will be File object for profile
    }


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
    console.log(response.data.message=="Logedin",'response Login Api')
  
    if (response.data.message == "The password is incorrect") {
      return toast.error("The password is incorrect")
    }

    secureLocalStorage.setItem("token", response.data.
      token)
    secureLocalStorage.setItem("User_info", response.data.
      user)
      secureLocalStorage.getItem("User_info")
    console.log(response, 'response')
    console.log( secureLocalStorage.getItem("User_info"))
    return response
    // return response
  } catch (error) {
    // console.log(error.message)
    toast.error(error?.message)

  }
}

export { handelapiSigup, handelLogin }