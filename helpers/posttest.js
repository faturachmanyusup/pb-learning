const pg = require('../libs/pg')

const deleteAccountTest = async () => {
  try {
    await pg.user.delete({
      where: {
        email: "test@email.com"
      }
    })
  } catch (err) {
    throw err
  }
}

console.log(">>>  deleting test's account")

deleteAccountTest()
  .then(_ => {
    console.log(">>>  test's account deleted")
  })
  .catch(err => {
    console.log(err)
    console.log("^^^  error while deleting test's account")
  })