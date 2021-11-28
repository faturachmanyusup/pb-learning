const mongoose = require('mongoose')

const { Schema, mongo } = mongoose
const ObjectId = Schema.ObjectId

const File = new Schema({
  _id: { type: ObjectId, default: () => new mongo.ObjectId() },
  filename: { type: String },
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Message = new Schema({
  _id: { type: ObjectId, default: () => new mongo.ObjectId() },
  userId: { type: String, index: true },
  username: { type: String },
  userImg: { type: String },
  text: { type: String },
  files: { type: [File] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Chat = new Schema({
  _id: { type: ObjectId, default: () => new mongo.ObjectId() },
  classId: { type: String, index: true },
  messages: { type: [Message] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

mongoose.connect(process.env.DATABASE_URL_MONGO, (err) => {
  if (err) {
    console.log(err, '<<<< ERROR WHILE CONNECTING TO MONGODB')
  }
})

module.exports.Chat = mongoose.models.Chat || mongoose.model('Chat', Chat)
