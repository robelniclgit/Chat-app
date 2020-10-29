let socket = io();

socket.on('connect', () => {
    console.log('connexion au serveur');
});

socket.on('disconnect', () => {
    console.log('déconnexion au serveur');
});

socket.on('newMessage', (message) => {

    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector("#message-template").innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    const div = document.createElement("div");
    div.innerHTML = html;

    document.querySelector("#all_messages").appendChild(div);

    onScrollBottom();
});

socket.on('newLocationMessage', (message) => {

    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector("#location-message-template").innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    const div = document.createElement("div");
    div.innerHTML = html;

    document.querySelector("#all_messages").appendChild(div);

    onScrollBottom();
});


document.querySelector("#submit").addEventListener("click", function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector("#message").value
    }, function(message){
        console.log(message);
    });
});

document.querySelector("#send-location").addEventListener("click", function(e){

    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your navigator");
    }

    // récupération position en cours
    navigator.geolocation.getCurrentPosition(function (position){

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

    }, function(){
        alert("position non trouvé");
    })
});

function onScrollBottom() {
    let messages = document.querySelector("#all_messages").lastElementChild;
    messages.scrollIntoView();
}