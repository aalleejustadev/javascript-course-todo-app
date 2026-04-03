// State management
let todos = [];

// DOM element references
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const totalCount = document.querySelector('#total-count');
const completedCount = document.querySelector('#completed-count');

// Event listeners
todoForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === '') {
    return;
  }

  addTodo(text);
  todoInput.value = '';
  todoInput.focus();
});

// Add new todo
function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
  console.log('Todos:', todos);
  renderTodos();
  updateStats();
  saveTodos();
}

// Render all todos
function renderTodos() {
  todoList.innerHTML = ''; // reset

  if (todos.length === 0) {
    todoList.innerHTML = `
      <div class="empty-state">
        <p>No todos yet!</p>
        <p style="font-size: 14px;">Add your first task above to get started!</p>
      </div>
    `;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onChange="toggleComplete(${todo.id})" />

      <span class="todo-text">${todo.text}</span>

      <div class="todo-actions">
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">
          Delete
        </button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  updateStats();
  saveTodos();
}

// Toggle todo completion
function toggleComplete(id) {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completedCount;
    renderTodos();
    updateStats();
    saveTodos();
  }
}

// Statistics
function updateStats() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  totalCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  completedCount.textContent = `${completed} completed`;
}

// save todos to local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from local storage
function loadTodos() {
  const savedTodos = localStorage.getItem('todos');

  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
    updateStats();
  }
}

// Initiate app
loadTodos();
