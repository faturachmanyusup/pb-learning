import { getSession } from "next-auth/react"
import errHandler from "libs/errHandler"
import pg from "libs/pg";

export default async function join(req, res) {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const session = await getSession({ req })

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    const { code } = req.body

    const _class = await pg.class.findUnique({
      where: { code }
    })

    if (!_class) {
      throw { message: "class not found" }
    }

    const alreadyJoined = await pg.classStudent.findFirst({
      where: {
        classId: _class.id,
        studentId: session.user.id
      }
    })

    if (alreadyJoined) {
      throw { message: "already joined before" }
    }

    await pg.classStudent.create({
      data: {
        studentId: session.user.id,
        classId: _class.id
      }
    })

    res.status(201).json({
      message: "Joined",
      classCode: code
    })
  } catch (err) {
    errHandler(res, err)
  }
}