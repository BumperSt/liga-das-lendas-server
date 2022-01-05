const mongoose = require('mongoose')

const dataBase = () => {
  // Database connection
  console.log(process.env.MONGO_CONNECTION_URL)
  mongoose.connect(process.env.MONGO_CONNECTION_URL,(err) => {
    if (err) {
        console.error(err)
    }
    else {
        console.info("Mongo connected")
    }
    })
}
module.exports = dataBase