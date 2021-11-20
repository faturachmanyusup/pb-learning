import errHandler from "libs/errHandler"
import pg from "libs/pg"

const postTest = async (req, res) => {
  try {
    if (req.method.toUpperCase() !== 'DELETE') {
      throw { message: "invalid method", onlyAccepted: "DELETE" }
    }

    await pg.user.delete({
      where: {
        email: "test@email.com"
      }
    })

    res.status(200).json({ message: "Success. Test account deleted" })
  } catch (err) {
    errHandler(res, err)
  }
}

export default postTest