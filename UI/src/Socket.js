import secureLocalStorage from "react-secure-storage";
import { io } from "socket.io-client";
 const UserName = secureLocalStorage.getItem("User_info")

const URL = "http://localhost:5001"; // your backend

export const socket = io(URL, {
  autoConnect: true, // control connection manually
  query:{
    userId:UserName?._id
  }
});