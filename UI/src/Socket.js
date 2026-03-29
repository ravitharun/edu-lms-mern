import { io } from "socket.io-client";

const URL = "http://localhost:5001"; // your backend

export const socket = io(URL, {
  autoConnect: true, // control connection manually
});