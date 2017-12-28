var localStorage = require('localStorage')
  , JsonStorage = require('json-storage').JsonStorage
  , todoStorage = JsonStorage.create(localStorage, 'todos', { stringify: true })
;

_this = this



exports.findTodoIndexByID = function(todos, todoID){
    var elementPos = todos.map(function(x) {return x.id; }).indexOf(todoID);
    return elementPos;
}

exports.createID = function(todos){
    var idArray = new Array();
    var todoLength = todos.length;
    try{
        for (var i = 0; i < todoLength; i++) {
            idArray.push(todos[i].id);
        }
        var max = idArray.reduce(function(a, b) {
            return Math.max(a, b);
        });
     } catch(e){
        max = 0;
    }
    return (max + 1);
}

exports.getTodos = function(){
    try {
        var todos = todoStorage.get('todoList');
        if(todos  === null){
            todos = [];
        }
        return todos;
    } catch (e) {
        throw Error('Error while getting Todos')
    }
}

exports.createTodo = async function(todo){
    var todos = this.getTodos();
    todoID = this.createID(todos);
    var newTodo = {
        title: todo.title,
        description: todo.description,
        dateCreated: new Date(),
        dateDue: todo.dateDue,
        status: todo.status,
        user: todo.user,
        id: todoID
    }
    todos.push(newTodo);
    try{
        todoStorage.set('todoList', todos);
        return todoStorage.get('todoList');
    }catch(e){  
        console.log(e)
        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = function(todo){
    var todos = this.getTodos();
    try{
        //Find the old Todo Object by the Title
        var oldTodoIndex = this.findTodoIndexByID(todos, todo.id);
        console.log('index' + oldTodoIndex)
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
    oldTodo.dateDue = todo.dateDue
    oldTodo.user = todo.user

    try{
        // remove old item and add edited item
        todos.splice(oldTodoIndex, 1, oldTodo);
        todoStorage.set('todoList', todos);
        return todos;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = function(id){
    var todos = this.getTodos();
    var todoIndex = this.findTodoIndexByID(todos, id);
    try{
        todos.splice(todoIndex, 1);
        todoStorage.set('todoList', todos);
        return todos;
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}
