var TodoService = require('../services/todos.service')

// Saving the context of this module inside the _the variable
_this = this

exports.getTodos = async function(req, res, next){

    try{
    
        var todos = TodoService.getTodos();
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        console.log('got to controller');
        return res.status(200).json({status: 200, data: todos, message: "Recieved Todos Succesfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){
    // req.body contains the form submit values.
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dateDue: req.body.dateDue,
        dateCreated: req.body.dateCreated,
        user: req.body.user,
        id: ''
    }

    try{
        // console.log(todo);
        // Calling the Service function with the new object from the Request Body
        var createdTodo = await TodoService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Created Todo Succesfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateTodo = async function(req, res, next){
    console.log(req.body)
    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var todo = {
        id: req.body.id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null,
        dateDue: req.body.dateDue ? req.body.dateDue : null,
        user: req.body.user ? req.body.user : null,
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Updated Todo Succesfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;
    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Todo Deleted Succesfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}