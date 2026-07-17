import secureLocalStorage from "react-secure-storage";
import { socket } from "../Socket";
export const UserRole = secureLocalStorage.getItem("User_info")
export const UserLogin = secureLocalStorage.getItem("token")
export const UserName = secureLocalStorage.getItem("User_info")
export const totalClass = secureLocalStorage.getItem('totalClass')
export const MaintanceMode = false;
export const ClassName_hover_btn = "hover:cursor-pointer"
export const UserProfileInfo = secureLocalStorage.getItem("User_info")
export let dt = new Date().getFullYear();
export const userRoutingDashboard = UserName?.role == "Teacher" ? "/teacher-dashboard" : UserName?.role == "student" ? "/StudentDashboard" : "/AdminDashboard"
export const userRoutingProfilePage = UserName?.role == "Teacher" ? "/teachers/profile" : UserName?.role == "student" ? "/profile" : "/teachers/profile"
export const handleLogout = (redirect) => {
    const get = secureLocalStorage.removeItem("token")
    const UserName = secureLocalStorage.removeItem("userProfileInfo")
    if (!get) {
        setTimeout(() => {
            return redirect("/login");
        }, 1500);
    }
    socket.disconnect();
    return true
}
export const HandelLogin = () => {
    const get = secureLocalStorage.getItem("token")
    const UserInfo = secureLocalStorage.getItem("User_info")
    if (get && UserInfo) {

        return alert("Your are Alreafy Logined In.")
    }
}

export const url = import.meta.env.VITE_SERVER_API_Region == "Local" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_SERVER_API_URL

export const Header_Token_expry = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserLogin} `
    }
}
export const Header_Token_expry_Formdata = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${UserLogin} `
    }
}