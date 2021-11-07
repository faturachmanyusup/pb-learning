import { getSession } from "next-auth/react"
import errHandler from "libs/errHandler"
import pg from "libs/pg";

export default async function get(req, res) {
  try {
    if (req.method.toUpperCase() !== 'GET') {
      throw { message: "invalid method", onlyAccepted: "GET" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    if (!req.query.code) {
      throw { message: "empty class code" }
    }

    const code = req.query.code

    const classFound = await pg.class.findUnique({
      where: { code },
      include: {
        teacher: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    if (!classFound) {
      throw { message: "class not found" }
    }

    res.status(200).json({
      message: "Success",
      class: classFound
    })
  } catch (err) {
    errHandler(res, err)
  }
}