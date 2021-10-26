const { v4 } = require('uuid')

const generateCode = () => v4().slice(9, 18)

module.exports = generateCode
