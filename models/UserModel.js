import bcrypt from 'bcrypt'
import { User } from './User.js'

class UserModel {

  static async findByEmail(email) {
    return await User.findOne({ email })
  }

  static async validateCredentials({ email, password }) {
    const user = await this.findByEmail(email)
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return user
  }

  static async createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    return await user.save()
  }
}

export default UserModel
