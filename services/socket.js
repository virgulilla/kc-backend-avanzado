import { Server } from "socket.io";
import { ChatMessage } from "../models/ChatMessage.js";
import * as sessionManager from "../lib/sessionManager.js";

export let io = null;

export function setupSocket(server) {
  io = new Server(server);
  io.use((socket, next) => {
    sessionManager.sessionMiddleware(socket.request, {}, next);
  });

  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
    socket.sessionId = socket.request.session.id;
    console.log(socket.request.session.id);
    socket.join(socket.sessionId);

    // No necesitamos la room por producto
    // Ahora todos los usuarios logueados estarán en un chat global

    // Enviar mensaje al chat global
    socket.on("sendMessage", async ({ sender, message }) => {
      // Crear el mensaje y guardarlo en la base de datos
      const chatMessage = new ChatMessage({ sender, message });
      await chatMessage.save();

      // Emitir el mensaje a todos los usuarios conectados
      io.emit("newMessage", {
        sender,
        message,
        createdAt: chatMessage.createdAt,
      });
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });
}
