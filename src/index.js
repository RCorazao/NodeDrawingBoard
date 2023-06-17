const indexRoutes = require('../src/routes/web.js');

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@drawdb.zldew.mongodb.net/?retryWrites=true&w=majority`;


// initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// settings
app.set('port', process.env.PORT || 3000);

// base de datos
mongoose.connect(url, 
    { useNewUrlParser: true }
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

// sockets
require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));

app.use(indexRoutes);
// starting server
server.listen(app.get('port'), () => {
    //console.log("Server on port 3000");
});