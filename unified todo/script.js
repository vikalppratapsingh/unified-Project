// ----- Utility functions for local storage and rendering -----
function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}
function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function renderTodos() {
    const todos = getTodos();
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach((todo, idx) => {
        const item = document.createElement('li');
        item.className = 'todo-item' + (todo.completed ? ' completed' : '');
        item.innerHTML = `
            <span class="todo-left">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} id="check-${idx}">
                <span class="todo-label" id="label-${idx}">${todo.text}</span>
            </span>
            <span class="todo-actions">
                <button class="edit-btn" data-idx="${idx}">Edit</button>
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </span>
        `;
        list.appendChild(item);

        // Checkbox toggle
        item.querySelector('input').addEventListener('change', function() {
            toggleCompleted(idx);
        });
        // Edit button
        item.querySelector('.edit-btn').addEventListener('click', function() {
            editTodo(idx);
        });
        // Delete button
        item.querySelector('.delete-btn').addEventListener('click', function() {
            deleteTodo(idx);
        });
        // Double-click to edit label
        item.querySelector('.todo-label').addEventListener('dblclick', function() {
            editTodo(idx);
        });
    });
    if (todos.length === 0) {
        list.innerHTML = `<li style="text-align:center;color:#bbb;font-style:italic;">No tasks yet.</li>`;
    }
}

// ----- CRUD Operations -----
function addTodo(text) {
    if (!text.trim()) {
        showError("Task cannot be empty");
        return;
    }
    const todos = getTodos();
    todos.push({ text: text.trim(), completed: false });
    setTodos(todos);
    renderTodos();
}

function toggleCompleted(idx) {
    const todos = getTodos();
    todos[idx].completed = !todos[idx].completed;
    setTodos(todos);
    renderTodos();
}

function deleteTodo(idx) {
    const todos = getTodos();
    todos.splice(idx, 1);
    setTodos(todos);
    renderTodos();
}

// In-place editing feature
function editTodo(idx) {
    const todos = getTodos();
    const list = document.getElementById('todo-list');
    const item = list.children[idx];
    const left = item.querySelector('.todo-left');
    const actions = item.querySelector('.todo-actions');

    // Replace label with input
    left.innerHTML = `
        <input type="checkbox" ${todos[idx].completed ? 'checked' : ''} disabled>
        <input type="text" id="edit-input" value="${todos[idx].text}">
    `;
    actions.innerHTML = `
        <button class="save-btn" data-idx="${idx}">Save</button>
        <button class="cancel-btn" data-idx="${idx}">Cancel</button>
    `;

    const input = document.getElementById('edit-input');
    input.focus();

    // Save edit
    actions.querySelector('.save-btn').onclick = function() {
        const newValue = input.value.trim();
        if (newValue === "") {
            showError("Task cannot be empty.");
            return;
        }
        todos[idx].text = newValue;
        setTodos(todos);
        renderTodos();
    };
    // Cancel edit
    actions.querySelector('.cancel-btn').onclick = function() {
        renderTodos();
    };
}

// ----- Error Handling -----
function showError(msg) {
    const e = document.getElementById('error');
    e.textContent = msg;
    setTimeout(() => { e.textContent = ""; }, 1800);
}

// ----- Form Submission -----
document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    addTodo(input.value);
    input.value = "";
});

// ----- Initial Render -----
window.onload = renderTodos;