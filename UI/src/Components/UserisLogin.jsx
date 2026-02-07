import { useEffect } from "react"
import secureLocalStorage from "react-secure-storage"

export const fun = () => {
    let tkn = secureLocalStorage.getItem("token")
    // console.log("tkn", tkn)

    if (tkn == null) {
        return window.location.href="/login"
    }

}