const mongoose = require('mongoose')

const dataBase = () => {
  // Database connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL,
    {
        useNewUrlParser: true
      // useUnifiedTopology:true
    }, (err) => {
      if (err) {
        // Log the error
        console.error(err)
      }
      else {
        // Log success
        console.info("Mongo connected")
      }
    })
}
module.exports = dataBase