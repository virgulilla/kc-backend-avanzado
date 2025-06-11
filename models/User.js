import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },    
  password: { type: String, required: true }
})

userSchema.statics.hashPassword = (clearPassword) => {
  return bcrypt.hash(clearPassword, 10)
}
  
 export const User = mongoose.model('User', userSchema)