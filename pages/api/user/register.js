import errHandler from "libs/errHandler"
import bcrypt from "libs/bcrypt"
import pg from "libs/pg"

const handleRegister = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    await pg.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hash(req.body.password)
      }
    })

    res.status(201).json({
      message: "Akun berhasil dibuat"
    })
  } catch (err) {
    errHandler(res, err)
  }
}

export default handleRegister