import { ToastType } from "../ReactToast/Toast"
import axios from "axios"
const handelapiSigup = async (data, e) => {
  e.preventDefault()
  try {
    const response = await axios.post("")
    console.log(response, data.message)
  } catch (error) {

  }
}
const handelLogin = async (data, e) => {
  try {
    e.preventDefault()
    // e.p
    console.log(data, "login data")
  } catch (error) {

  }
}

export { handelapiSigup, handelLogin }