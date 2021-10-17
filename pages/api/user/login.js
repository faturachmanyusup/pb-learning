import errHandler from "helpers/errHandler";
import bcrypt from "libs/bcrypt";
import pg from "libs/pg";

const handleLogin = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const { email, password } = req.body

    const user = await pg.user.findUnique({
      where: { email }
    })

    if (bcrypt.compare(password, user.password)) {
      res.status(200).json({ user, message: "Login berhasil" })
    } else {
      throw { message: "auth failed" }
    }
  } catch (err) {
    errHandler(res, err)
  }
}

export default handleLogin;