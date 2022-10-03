require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const database = require('./config/database')
database()
require('./config/config')(app)
const routes = require('./src/routes')

routes(app)

const server = http.Server(app)
console.log('Server running on port ' + process.env.PORT)
server.listen(process.env.PORT)

