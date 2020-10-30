const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("Un nouvel utilisateur connécté");

    socket.on('join', (params, callback) => {

        console.log("mes parametres", params, params.username, !isRealString(params.username), !isRealString(params.room));

        if(!isRealString(params.username) || !isRealString(params.room)){
            callback('Name and room are required');
        }

        socket.join(params.room);

        socket.emit('newMessage', generateMessage("Admin", "Bienvenu dans l'application"));

        socket.broadcast.emit('newMessage', generateMessage("Admin", "Nouveau membre : "+params.username+" "+params.room));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('Un message envoyé depuis le serveur');
    });

    socket.on('createLocationMessage', (coords) => {
        socket.broadcast.emit('newLocationMessage', generateLocationMessage("Admin", coords.lat, coords.lng));
    });

    socket.on('disconnect', (socket) => {
        console.log("Utilisateur déconnécté");
    });
});

server.listen(port, () => {
    console.log(`serveur lancé sur le port ${port}`)
});