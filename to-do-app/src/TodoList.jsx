import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "Welcome! Start by adding a task.", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos(prev => [...prev, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };
  const updateTodoValue = e => setNewTodo(e.target.value);
  const deleteTodo = id => setTodos(prev => prev.filter(t => t.id !== id));
  const toggleDone = id =>
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );

  return (
    <div className="todo-container">
      <h1 className="todo-title">✨ High‑End Todo List</h1>
      <div className="todo-input-wrap">
        <input
          className="todo-input"
          placeholder="What’s on your agenda?"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="todo-add-btn" onClick={addNewTask}>
          + Add Task
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.isDone ? "done" : ""}`}
          >
            <span className="todo-text">{todo.task}</span>
            <div className="todo-actions">
              <button
                className="todo-done-btn"
                onClick={() => toggleDone(todo.id)}
              >
                {todo.isDone ? "↺ Undo" : "✓ Done"}
              </button>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                🗑 Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
