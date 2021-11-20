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

console.log(">>>  deleting test account")

deleteAccountTest()
  .then(_ => {
    console.log(">>>  test account deleted")
  })
  .catch(err => {
    if (err.code === "P2025") {
      console.log(">>>  cannot find test account in database")
      return
    }

    console.log(err)
    console.log("^^^  error while deleting test account")
  })