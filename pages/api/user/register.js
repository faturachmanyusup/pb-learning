import errHandler from "helpers/errHandler";
import bcrypt from "libs/bcrypt";
import pg from "libs/pg";

const handleRegister = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      errHandler(res, { message: "invalid method" })
    }

    const newUser = await pg.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hash(req.body.password)
      }
    })

    res.status(201).json({
      name: newUser.name,
      email: newUser.email
    })
  } catch (err) {
    console.log(err.message, "<<< ERROR")
    errHandler(res, err)
  }
}

export default handleRegister