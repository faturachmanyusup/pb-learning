import bcrypt from 'bcrypt'
const saltRounds = 10;

export default {
  hash: (text) => bcrypt.hashSync(text, saltRounds),
  compare: (text, hashedText) => bcrypt.compareSync(text, hashedText)
}