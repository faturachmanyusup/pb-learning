import errHandler from "libs/errHandler"
import pg from "libs/pg";
import Time from "libs/Time";

export default async function get(req, res) {
  try {
    if (req.method.toUpperCase() !== 'GET') {
      throw { message: "invalid method", onlyAccepted: "GET" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    const targetMonth = new Time(
      req.query.year || new Time().year,
      req.query.month || new Time().month,
    )

    const filterDate = {
      start: new Date(
        req.query.year || String(new Time().year),
        req.query.month || new Time().month,
        1
      ),
      end: new Date(
        req.query.year || String(new Time().year),
        req.query.month || new Time().month,
        targetMonth.lastDateOfMonth
      )
    }

    const schedules = await pg.schedule.findMany({
      where: {
        date: {
          lte: filterDate.end,
          gte: filterDate.start
        },
        class: {
          OR: [
            {
              students: {
                some: {
                  studentId: session.user.id
                }
              }
            },
            { teacherId: session.user.id }
          ]
        }
      },
      include: {
        class: {
          select: {
            name: true
          }
        }
      },
      orderBy: { date: 'asc' }
    })

    res.status(200).json({
      message: "Success",
      schedules: schedules
    })
  } catch (err) {
    errHandler(res, err)
  }
}