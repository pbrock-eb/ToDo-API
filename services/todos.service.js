var localStorage = require('localStorage')
  , JsonStorage = require('json-storage').JsonStorage
  , todoStorage = JsonStorage.create(localStorage, 'todos', { stringify: true })
  , userStorage = JsonStorage.create(localStorage, 'users', { stringify: true })
;

_this = this



exports.findTodoIndexByTitle = function(todos, todoTitle){
    var elementPos = todos.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
    return elementPos;
}

exports.getTodos = function(){
    try {
        var todos = todoStorage.get('todos');
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createTodo = function(todo){
    var newTodo = {
        title: todo.title,
        description: todo.description,
        dateCreated: new Date(),
        dateDue: todo.dateDue,
        status: todo.status,
        user: todo.user
    }
    var todos = this.getTodos();
    todos.push(newTodo);
    try{
        var savedTodos = todoStorage.set('todos', todos);
        return savedTodos;
    }catch(e){  
        console.log(e)
        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = function(todo){
    var todos = this.getTodos();
    try{
        //Find the old Todo Object by the Title
        var oldTodoIndex = this.findTodoIndexByTitle(todos, todo.title);
        var oldTodo = todos[oldTodoIndex];
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false
    if(!oldTodo){
        return false;
    }
    
    //Edit the Todo Object
    oldTodo.title = todo.title
    oldTodo.description = todo.description
    oldTodo.status = todo.status
    oldTodo.dueDate = todo.dueDate
    oldTodo.user = todo.user

    console.log(oldTodo)

    try{
        // remove old item and add edited item
        todos
            .splice(oldTodoIndex, 1)
            .push(oldTodo)
        ;
        return todos;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = function(todo){
    var todos = this.getTodos();
    var todoIndex = this.findTodoIndexByTitle(todo.title);
    try{
        todos.splice(todoIndex, 1);
        return todos;
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}
