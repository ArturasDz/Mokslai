const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//env
dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/to-do-list.json");

//server
const app = express();

app.use(express.json());

//*!*!*!*!*!*!*!*!*!
const tasks = JSON.parse(fs.readFileSync(dir));
//!*!*!*!*!*!*!*!*!*

//contributors *****
//GET ALL TASKS
const getAllTasks = (req, res) => {
  res.status(200).json({
    //gali buti fail arba error
    status: "success",
    count: tasks.length,
    data: tasks,
  });
};
//POST TASK
const postTask = (req, res) => {
  const newID = tasks[tasks.length - 1].id + 1;
  const newTask = {
    id: newID,
    ...req.body,
  };
  tasks.push(newTask);

  fs.writeFile(dir, JSON.stringify(tasks), () => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Error writing file",
      });
    }
    res.status(201).json({
      status: "success",
      data: newTask,
    });
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const newTask = req.body;
  const taskId = parseInt(id);
  if (isNaN(taskId)) {
    res.status(400).json({ error: "Invalid ID" });
  }
  const task = task.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({
      status: "failed",
      message: "Task not found",
    });
  }
  res.json({ message: "Task update", task });
};

app.route("/todos").get(getAllTasks).post(postTask);
app.route("/todos/:id").patch(updateTask);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
