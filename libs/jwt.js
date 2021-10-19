import jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY

export default {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_KEY)
    } catch (err) {
      throw { message: "auth failed" }
    }
  },
  verify: (token) => {
    try {
      return jwt.verify(token, JWT_KEY)
    } catch (err) {
      throw { message: "auth failed" }
    }
  }
}