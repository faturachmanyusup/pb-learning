import errHandler from "libs/errHandler"
import { Chat } from "libs/mongo";

export default async function create(req, res) {
  try {
    if (req.method.toUpperCase() !== 'POST') {
      throw { message: "invalid method", onlyAccepted: "POST" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    if (!req.body?.classId) {
      throw { message: "empty classId" }
    }

    const filter = { classId: req.body.classId }
    const options = { upsert: true }
    const update = {
      classId: req.body.classId,
      $push: {
        messages: {
          userId: session.user.id,
          username: session.user.name,
          userImg: session.user.image,
          text: req.body.form.text,
          files: []
        }
      },
    }

    await Chat.findOneAndUpdate(filter, update, options)
    const messages = await Chat.aggregate([
      { $match: { classId: String(req.body.classId) } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $limit: req.body.limit + 1},
      { $replaceRoot: { "newRoot": "$messages" } }
    ])

    res.status(201).json({
      message: "Created",
      updated: messages
    })
  } catch (err) {
    errHandler(res, err)
  }
}