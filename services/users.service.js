var localStorage = require('localStorage')
  , JsonStorage = require('json-storage').JsonStorage
  , userStorage = JsonStorage.create(localStorage, 'users', { stringify: true })
;

_this = this

exports.findUserIndexByID = function(users, userID){
    var elementPos = users.map(function(x) {return x.id; }).indexOf(userID);
    return elementPos;
}

exports.createID = function(users){
    var idArray = new Array();
    var userLength = users.length;
    try{
        for (var i = 0; i < userLength; i++) {
            idArray.push(users[i].id);
        }
        var max = idArray.reduce(function(a, b) {
            return Math.max(a, b);
        });
     } catch(e){
        max = 0;
    }
    return (max + 1);
}

exports.getUsers = function(query, page, limit){
    try {
        var users = userStorage.get('userList');
        if(users  === null){
            users = [];
        }
        return users;
    } catch (e) {
        throw Error('Error while getting Users')
    }
}

exports.createUser = async function(user){
    var users = this.getUsers();
    console.log(users)
    userID = this.createID(users);
    var newUser = {
        fName: user.fName,
        lName: user.lName,
        dateCreated: new Date(),
        id: userID
    }
    users.push(newUser);
    try{
        userStorage.set('userList', users);
        return userStorage.get('userList');
    }catch(e){  
        console.log(e)
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function(user){
    var id = user.id

    try{
        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the User")
    }

    if(!oldUser){
        return false;
    }

    oldUser.fName = user.fName
    oldUser.lName = user.lName


    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = function(id){
    var users = this.getUsers();
    var userIndex = this.findUserIndexByID(users, id);
    try{
        users.splice(userIndex, 1);
        userStorage.set('userList', users);
        return users;
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}