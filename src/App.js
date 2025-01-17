import React, { useState } from "react";
import "./App.css"; // Import the CSS file

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAdd(newTask) {
    setTasks((prev) => [...prev, newTask]);
    console.log(newTask);
  }

  function handleReset(e) {
    e.preventDefault();
    setTasks([]);
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div>
      <div className="app-container">
        <h2 className="header">Things TODO</h2>
        <TaskForm onHandleAdd={handleAdd} />
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
      <button className="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

function TaskForm({ onHandleAdd }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("personal");
  const [deadline, setDeadline] = useState("");

  const newTask = {
    id: crypto.randomUUID(),
    task,
    category,
    deadline,
    completed: false,
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) return;
    onHandleAdd(newTask);
    setTask("");
    setCategory("personal");
    setDeadline("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What TODO !!"
        className="input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="personal">Personal</option>
        <option value="office">Office</option>
        <option value="others">Others</option>
      </select>
      <input
        type="date"
        className="date-input"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p className="p">No tasks yet. Add some!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-details">
                <strong>{task.task}</strong> - <em>{task.category}</em>
                {task.deadline && <span> (Due: {task.deadline})</span>}
              </div>
              <div className="task-actions">
                <button
                  className="button action-button"
                  onClick={() => onToggle(task.id)}
                >
                  {task.completed ? "Undo" : "Completed"}
                </button>
                <button
                  className="button action-button"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
