var gNextId = 1;
var gTodos = [];
var gTodoFilterBy = 'All'; 
var gTodoSortBy = 'Text'; 
const TODOS_KEY = 'todos';

function createTodos() {

    var todos = loadFromStorage(TODOS_KEY)

    if (!todos || todos.length === 0) {
        todos = [
            createTodo('Eat that thing'),
            createTodo('Learn how to code'),
            createTodo('Do the Ex')
        ];
    } else {
        gNextId = findNextId();
    }

    gTodos = todos;
}

function getTodosForDisplay() {
    if (gTodoFilterBy === 'All') return gTodos;
    if (gTodoSortBy === 'Text') return gTodos;

    return gTodos.filter(function(todo) {
        return todo.isDone && gTodoFilterBy === 'Done' || 
               !todo.isDone && gTodoFilterBy === 'Active'; 
    });

}

function createTodo(txt,value) {
    if (!value) value=1;
    return {
        id: gNextId++,
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: value
    }
}

function addTodo(txt,importance) {
    gTodos.push(createTodo(txt,importance))
    saveToStorage(TODOS_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id;
    })
    todo.isDone = !todo.isDone;
}

function deleteTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id;
    })  
    gTodos.splice(idx, 1);
    saveToStorage(TODOS_KEY, gTodos)
}

function findNextId() {
    var max = 0;
    gTodos.forEach(function(todo) {
        if (todo.id > max) max = todo.id;
    })
    return max + 1;
}

function setTodosFilter(filterBy) {
    gTodoFilterBy = filterBy;
}

function setTodosSort(sortBy) {
    gTodoSortBy = sortBy;
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function(todo){
        return !todo.isDone
    })
    return activeTodos.length;
}

