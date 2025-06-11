import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connection.on('error', err => {
  console.error('Error de conexión a MongoDB:', err)
  process.exit(1)
})

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name)
})

export default function connectMongoose() {
  const dbURI = process.env.MONGODB_URI
  return mongoose.connect(dbURI).then(mongoose => mongoose.connection)
}