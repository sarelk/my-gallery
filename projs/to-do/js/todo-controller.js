'use strict';

function init() {
    console.log('Todos App');
    createTodos();
    render();

}

function render() {
    renderTodos();
    renderStats();
}

function renderTodos() {
    var todos = getTodosForDisplay();

    var strHtmls = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : ''
        return `<li class="${className}" onclick="onTodoClicked(this, ${todo.id})">
                    ${todo.txt}
                    <span class="actions">
                        <button class="btn" onclick="onDeleteTodo(event, ${todo.id})">x</button>
                    </span>
                </li>`
    })
    
    document.querySelector('.todos').innerHTML = strHtmls.join('');

    console.table(todos);
}
function renderStats() {
    var todos = getTodosForDisplay();

    document.querySelector('.active-count').innerHTML = todos.length
}

function onAddTodo() {
    var txt = prompt('What needs to be done?', 'Nothing');
    while (!txt) {
        alert('You cant enter a null task')
        var txt = prompt('What needs to be done?', 'Nothing');
    }
    var importance = +prompt('In the scale between 1 to 3, how much important is this?', '1');
    while (importance <= 0 || importance > 3 || isNaN(importance) === true) {
        alert('need to be a number between 1-3')
        var importance = +prompt('In the scale between 1 to 3, how much important is this?', '1');
    }
    addTodo(txt, importance);
    render();
}

function onTodoClicked(elTodo, todoId) {
    toggleTodo(todoId);
    render();
}

function onDeleteTodo(ev, todoId) {
    var isSure= confirm('Are You SURE?');
    if (isSure) {
        ev.stopPropagation();
        deleteTodo(todoId);
        render();
    }
}

function onFilterChange(filterByTxt) {
    console.log('filterByTxt', filterByTxt);
    setTodosFilter(filterByTxt);
    render();
}

function onSortChange(sortBy) {
    console.log('sortBy', sortBy);
    setTodosSort(sortBy);
    render();
}