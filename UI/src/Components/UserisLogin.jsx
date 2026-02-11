import { useEffect } from "react"
import toast from "react-hot-toast"
import secureLocalStorage from "react-secure-storage"

export const fun = () => {
    let tkn = secureLocalStorage.getItem("token")
    if (tkn == null) {
        setTimeout(() => {
            toast.error("Token Expryed Login Again.")
            return window.location.href = "/login"
        }, 1500);
    }   

}