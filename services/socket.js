import { Server } from 'socket.io'
import { ChatMessage } from '../models/ChatMessage.js'

export function setupSocket(server) {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado')

    // No necesitamos la room por producto
    // Ahora todos los usuarios logueados estarán en un chat global

    // Enviar mensaje al chat global
    socket.on('sendMessage', async ({ sender, message }) => {
      // Crear el mensaje y guardarlo en la base de datos
      const chatMessage = new ChatMessage({ sender, message })
      await chatMessage.save()

      // Emitir el mensaje a todos los usuarios conectados
      io.emit('newMessage', { sender, message, createdAt: chatMessage.createdAt })
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado')
    })
  })
}
