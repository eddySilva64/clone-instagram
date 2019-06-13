const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

/**
 * Conexão com o meu banco de dados
 */
mongoose.connect('mongodb+srv://instagram:instagram@cluster0-9lsso.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

app.use((req, res, next)=>{
    req.io = io

    next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

/**
 * Chamada ao meu arquivo de rotas
 */
app.use(require('./routes'))

server.listen(3333)