// Always use your Render backend API
const API_URL = "https://my-todo-api-owh5.onrender.com/todos";

// Load all todos
async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();

    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach(todo => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${todo.text}</span>
        <button onclick="deleteTodo('${todo.id}')">Delete</button>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading todos:", err);
  }
}

// Add new todo
async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTodos();
}

// Delete todo
