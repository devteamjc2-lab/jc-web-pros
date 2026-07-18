import { io } from "socket.io-client";

const socket = io("https://jc-web-pros.onrender.com/", {
  autoConnect: false,
});

export default socket;