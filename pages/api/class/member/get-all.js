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

    const classFound = await pg.class.findFirst({
      where: { code },
      include: {
        teacher: true,
        Schedule: true
      }
    })

    if (!classFound) throw { message: "class not found" }

    const members = await pg.user.findMany({
      where: {
        OR: [
          {
            classes: {
              some: {
                class: { code }
              }
            }
          },
          {
            teaches: {
              some: { code }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        teaches: {
          where: {
            code
          }
        }
      },
      orderBy: {
        teaches: {
          _count: 'asc'
        }
      }
    })

    res.status(200).json({
      message: "Success",
      class: classFound,
      members: members
    })
  } catch (err) {
    errHandler(res, err)
  }
}