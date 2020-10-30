// instanciation du socket du côté client
let socket = io();

socket.on('connect', () => {

    // console.log('listes utilisteurs', users);

    // Récupération des paramètres GET
    let searchQuery = window.location.search.substring(1);
    // On décode le paramètre et structurer en tant que JSON
    let params = decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, '').replace(/=/g, '":"');
    params = JSON.parse('{"' + params + '"}');

    // on emètte une socket de join vers le serveur
    socket.emit('join', params, function(err){
        // si la fonction de callback retourne une erreur
        if(err){
            alert(err);
            window.location.href = "/";
        }
        // si pas d'erreur
        else{
            console.log('No error');
        }
    });

});

socket.on('disconnect', () => {
    console.log('déconnexion au serveur');
});

socket.on('updateUserList', function(users){
    let ol = document.createElement("ol");

    users.forEach(user => {
        let li = document.createElement("li");
        li.innerHTML = user;
        ol.appendChild(li);
    });
        
    let userList = document.querySelector("#users");
    userList.innerHTML = "";
    userList.appendChild(ol);

    console.log(users);
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