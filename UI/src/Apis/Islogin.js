import secureLocalStorage from "react-secure-storage";
export const UserRole=secureLocalStorage.getItem("Role")
export const UserLogin = secureLocalStorage.getItem("token")

