const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const config = require('./config/config.json');

const app = express();

const server = require('http').Server(app);  // suporte ao protocolo http
const io = require('socket.io')(server);     // suporte ao protocolo websocket

mongoose.connect(config.mongodb.url, {
    useNewUrlParser: true
})

// middleware, para todas as rotas em sequencia terem acesso ao req.io
app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors()) // permite acesso ao backend de apps em diferentes dominios

// rota estática para acesso a pasta resized
// http://localhost:3333/files/zero_vs_null.jpg
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'));

server.listen(3333);