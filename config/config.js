const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')   
const cors = require('cors')
const helmet = require('helmet')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(cors({ origin: 'https://liga-das-lendas-client.vercel.app/'}))
  app.use(helmet())
}