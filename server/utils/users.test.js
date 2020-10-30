const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            username: 'Mike',
            room: 'room list'
        }, {
            id: 2,
            username: 'Falu',
            room: 'temp pap list'
        }, {
            id: 3,
            username: 'Joe',
            room: 'room list'
        }];
    });


    it('add new user', () => {
        let users = new Users();
        let user = {
            id: 'kfkfjkfjo',
            username: 'nicl',
            room: 'node js'
        }
        
        let reUser = users.addUser(user.id, user.username, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node js', () => {
        let userList = users.getUserList('room list');

        expect(userList).toEqual(['Mike', 'Joe']);
    });

    it('should return names for temp pap list', () => {
        let userList = users.getUserList('temp pap list');

        expect(userList).toEqual(['Falu']);
    });

    it('should find user', () => {
        let userID = 2,
            user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it('should not find user', () => {
        let userID = 25,
            user = users.getUser(userID);

        expect(user).toBeUndefined();
    });

    it('should remove a user', () => {
        let userID = 1,
            user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userID = 15,
            user = users.removeUser(userID);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

});