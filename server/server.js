const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("Un nouvel utilisateur connécté");

    socket.on('join', (params, callback) => {

        if(!isRealString(params.username) || !isRealString(params.room)){
            callback('Name and room are required');
        }

        // joindre le socket au paramètre room
        socket.join(params.room);

        // on enlève l'utilisateur contenant le socket dans la liste
        users.removeUser(socket.id);
        // ajout de l'utilisateur
        users.addUser(socket.id, params.username, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage("Admin", `Bienvenue dans l'application ${params.username}`));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `Nouveau membre ${params.username} | ${params.room}`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.username, message.text));
        }

        callback('Un message envoyé depuis le serveur');
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user){
            socket.to(user.room).emit('newLocationMessage', generateLocationMessage(user.username, coords.lat, coords.lng));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `Utilisateur ${user.username} | ${user.room} déconnécté`));
        }
        console.log("Utilisateur déconnécté");
    });
});

server.listen(port, () => {
    console.log(`serveur lancé sur le port ${port}`)
});