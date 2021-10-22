import errHandler from "libs/errHandler"
import bcrypt from "libs/bcrypt"
import pg from "libs/pg"

const handleLogin = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const { email, password } = req.body

    const user = await pg.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw { message: "auth failed" }
    } else if (!bcrypt.compare(password, user.password)) {
      throw { message: "auth failed" }
    }

    res.status(200).json({ message: "Login berhasil" })
  } catch (err) {
    errHandler(res, err)
  }
}

export default handleLogin