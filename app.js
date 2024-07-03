const express = require('express')
const router = require('./src/router')
const database = require('./config/database')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// DB connection
database()

app.use('/', router)

app.listen(3000, function() {
    console.log('Servidor online!')
})