import "./App.css";
import { Route, Routes, NavLink } from "react-router";
import Home from "./components/Home";
import AddTaskForm from "./components/AddTaskForm";
import Tasks from "./components/Tasks";
import EditTask from "./components/EditTask";

export default function App() {
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/form">Add your new task to your list</NavLink>
            </li>
            <li>
              <NavLink to="/tasks">Tasks you need to do</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="form" element={<AddTaskForm />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<EditTask />} />
        </Routes>
      </main>
    </div>
  );
}
