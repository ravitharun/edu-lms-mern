import secureLocalStorage from "react-secure-storage";
export const UserRole = secureLocalStorage.getItem("User_info")
export const UserLogin = secureLocalStorage.getItem("token")
export const UserName = secureLocalStorage.getItem("User_info")
export const ClassName_hover_btn = "hover:cursor-pointer"
export const handleLogout = () => {
    const get = secureLocalStorage.removeItem("token")
    const UserName = secureLocalStorage.removeItem("User_info")
    console.log("get", get)
    if (!get) {
        return window.location.href = "/login";
    }
}
export const Header_Token_expry = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserLogin} `
    }
}