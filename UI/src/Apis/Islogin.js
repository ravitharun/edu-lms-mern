import secureLocalStorage from "react-secure-storage";
export const UserRole = secureLocalStorage.getItem("User_info")
export const UserLogin = secureLocalStorage.getItem("token")

