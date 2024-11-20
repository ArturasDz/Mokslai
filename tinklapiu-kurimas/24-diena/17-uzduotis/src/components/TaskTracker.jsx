import { useState } from "react";
import "./TaskTracker.css";
import TaskList from "./TaskList";

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    // const task = prompt("Enter a task:");
    setTasks([...tasks, { text: newTask, completed: false }]);
  };
  const [text, setText] = useState("Done");
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    setText("Undo");

    updatedTasks[index].completed = !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <ul>
        <button onClick={() => addTask(prompt("Enter a task:"))}>
          Add Task
        </button>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleComplete(index)}>{text}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
