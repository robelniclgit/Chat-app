class Users{
    constructor(){
        // on instancie un tableau d'utilisateur
        this.users = [];
    }

    // on crée une fonction d'ajout utilisateur
    addUser(id, username, room){
        let user = {id, username, room};
        this.users.push(user);
        return user;
    }

    // récupère la liste d'utilisateur en fonction de son room
    getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let name = users.map((user) => user.username);
        return name;
    }

    // recupère un objet user en fonction de son ID
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    // supprimer un utilisateur
    removeUser(id){
        let user = this.getUser(id);

        // si l'utilisateur existe alors on l'éfface dans users
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
}

module.exports = {Users};