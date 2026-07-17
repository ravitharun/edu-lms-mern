import secureLocalStorage from "react-secure-storage";
import { io } from "socket.io-client";

const UserName = secureLocalStorage.getItem("User_info")
const url = import.meta.env.VITE_SERVER_API_Region == "Local" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_SERVER_API_URL
export const socket = io(url, {
  autoConnect: true, // control connection manually
  query: {
    userId: UserName?._id
  }
});