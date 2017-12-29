var UserService = require('../services/users.service')

// Saving the context of this module inside the _the variable
_this = this

exports.getUsers = async function(req, res, next){

    try{
    
        var users = await UserService.getUsers({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        console.log('got to controller');
        return res.status(200).json({status: 200, data: users, message: "Recieved Users Succesfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createUser = async function(req, res, next){
    // req.body contains the form submit values.
    console.log(req.body)
    var user = {
        fName: req.body.fName,
        lName: req.body.lName,
        dateCreated: req.body.dateCreated,
        id: ''
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Created User Succesfully"})
    }catch(e){
        console.log(e)
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var user = {
        id,
        fName: req.body.title ? req.body.fNamne : null,
        lName: req.body.description ? req.body.lName : null,
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Updated User Succesfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){
    console.log(req.params.id)
    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "User Deleted Succesfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}