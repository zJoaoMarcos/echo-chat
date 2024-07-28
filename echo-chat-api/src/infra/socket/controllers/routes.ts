import { Server } from "socket.io";
import { initChatController } from "./chat/init-chat";
import { newMessageController } from "./chat/new-message";

export async function socketRoutes(io: Server) {
  io.on("connection", (socket) => {
    console.info("Socket connected!", socket.id);

    initChatController(socket, io)
    newMessageController(socket, io)
  
    socket.on("disconnect", (socket) => {
      console.log("Socket disconnect!", socket);
    });
  });
}
