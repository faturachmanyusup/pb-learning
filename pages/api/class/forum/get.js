import errHandler from "libs/errHandler"
import { Chat } from "libs/mongo";

export default async function get(req, res) {
  try {
    if (req.method.toUpperCase() !== 'GET') {
      throw { message: "invalid method", onlyAccepted: "GET" }
    }

    const session = JSON.parse(req.headers.session)

    if (!session.user?.id) {
      throw { message: "unauthenticated" }
    }

    if (!req.query.classId) {
      throw { message: "empty classId" }
    }

    const messages = await Chat.aggregate([
      { $match: { classId: req.query.classId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $skip: isNaN(req.query.skip) ? 0 : Number(req.query.skip) },
      { $limit: isNaN(req.query.limit) ? 5 : Number(req.query.limit) },
      { $replaceRoot: { "newRoot": "$messages" } }
    ])

    res.status(200).json({
      message: "Success",
      messages: messages || []
    })
  } catch (err) {
    errHandler(res, err)
  }
}