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

socket.emit('createMessage', {
    from: 'client: 1',
    text: 'client: just text'
}, (message) => {
    console.log('client fonction callback: ', message);
})