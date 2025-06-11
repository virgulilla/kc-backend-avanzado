import mongoose, { Schema } from 'mongoose'

const chatMessageSchema = new Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'chatmessages' })

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)
