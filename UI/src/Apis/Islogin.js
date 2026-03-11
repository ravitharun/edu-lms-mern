import { useState } from "react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
export const UserRole = secureLocalStorage.getItem("User_info")
export const UserLogin = secureLocalStorage.getItem("token")
export const UserName = secureLocalStorage.getItem("User_info")
export const totalClass = secureLocalStorage.getItem('totalClass')
export const ClassName_hover_btn = "hover:cursor-pointer"
export const UserProfileInfo = secureLocalStorage.getItem("userProfileInfo")
export let dt = new Date().getFullYear();
export const handleLogout = () => {
    const get = secureLocalStorage.removeItem("token")
    const UserName = secureLocalStorage.removeItem("User_info")
    if (!get) {
        setTimeout(() => {
            return window.location.href = "/login";
        }, 1500);
    }
    return true
}


export const Header_Token_expry = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserLogin} `
    }
}