import errHandler from "libs/errHandler"
import pg from "libs/pg";
import generateCode from "helpers/generateCode";

export default async function create(req, res) {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    const { newClass, schedules = [] } = req.body

    let formattedSchedules = schedules.map(schedule => {
      let date = new Date(schedule.date)

      let hour = schedule.time.slice(0, 2)
      let minute = schedule.time.slice(3)

      date.setHours(hour)
      date.setMinutes(minute)
      date.setSeconds(0)

      return { date, notes: schedule.notes }
    })

    let classCode = ""
    let codeExist = null

    do {
      classCode = generateCode()

      codeExist = await pg.class.findUnique({
        where: { code: classCode }
      })
    } while (codeExist);
    
    await pg.class.create({
      data: {
        teacherId: session.user.id,
        code: classCode,
        name: newClass.name,
        description: newClass.description,
        Schedule: {
          create: formattedSchedules
        }
      }
    })

    res.status(201).json({
      message: "Created",
      classCode: classCode
    })
  } catch (err) {
    errHandler(res, err)
  }
}