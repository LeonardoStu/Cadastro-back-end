require('dotenv').config()
const express = require('express')
const router = require('./src/router')
const database = require('./config/database')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.options('*', cors(corsOptions)); // Responde a todas as requisições OPTIONS
app.use(express.json())

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(res.getHeaders());
    });
    next();
});


// DB connection
database()

app.use('/', router)

app.listen(3000, function() {
    console.log('Servidor online!')
})