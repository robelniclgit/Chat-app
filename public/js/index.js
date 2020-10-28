let socket = io();

socket.on('connect', () => {
    console.log('connexion au serveur');
});

socket.on('disconnect', () => {
    console.log('déconnexion au serveur');
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
});