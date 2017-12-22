var User = require('../models/user.model')

_this = this

exports.getUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
        
    try {
        var users = await User.paginate(query, options)
        return users;
    } catch (e) {
        throw Error('Error while Paginating Users')
    }
}

exports.createUser = async function(user){
    var newUser = new User({
        fName: user.fName,
        lName: user.lName,
        dateCreated: new Date(),
    })

    try{
        var savedUser = await newUser.save()
        return savedUser;
    }catch(e){  
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

exports.deleteUser = async function(id){
    
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}