import errHandler from "libs/errHandler"
import pg from "libs/pg";

export default async function getAll(req, res) {
  try {
    if (req.method.toUpperCase() !== 'GET') {
      throw { message: "invalid method", onlyAccepted: "GET" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    const createdClasses = await pg.class.findMany({
      where: {
        teacherId: session.user.id
      },
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

    const joinedClasses = await pg.class.findMany({
      where: {
        students: {
          some: {
            id: session.user.id
          }
        }
      },
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

    res.status(200).json({
      message: "Created",
      createdClasses,
      joinedClasses
    })
  } catch (err) {
    errHandler(res, err)
  }
}