import errHandler from "helpers/errHandler";
import bcrypt from "libs/bcrypt";
import pg from "libs/pg";

const handleRegister = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const newUser = await pg.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hash(req.body.password)
      }
    })

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email
      },
      message: "Akun berhasil dibuat"
    })
  } catch (err) {
    console.log(err.message, "<<< ERROR")
    errHandler(res, err)
  }
}

export default handleRegister