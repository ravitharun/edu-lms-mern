import { ToastType } from "../ReactToast/Toast"

const handelapiSigup = (data, e) => {
  e.preventDefault()
  console.log(ToastType, ' toastType')
  console.log(data)
}
const handelLogin = async (data, e) => {
  try {
    e.preventDefault()
    // e.p
    console.log(data)
  } catch (error) {

  }
}

export { handelapiSigup, handelLogin }