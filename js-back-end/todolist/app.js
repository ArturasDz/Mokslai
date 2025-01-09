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

//EDIT A TASK
const updateTask = (req, res) => {
  let todo = tasks.find((todo) => todo.id == req.params.id);
  // fs.writeFile(dir, JSON.stringify(tasks), () => {
  if (todo) {
    todo.task = req.body.task;
    res.json(tasks);
  } else {
    res.status(404).json({
      message: "task does not exist",
    });
  }
};

//DELETE A TASK
const deleteTask = (req, res) => {
  const id = +req.params.id;
  const filteredTasks = tasks.filter((todo) => todo.id !== Number(id));
  // fs.writeFile(dir, JSON.stringify(tasks), () => {
  if (id < tasks.length + 1) {
    res.status(200).json({
      data: filteredTasks,
    });
  } else {
  res.status(404).json({
    status: "Failed",
    message: `There is no task with this Id: ${id}`,
  });
}
};

app.route("/api/v1/todos").get(getAllTasks).post(postTask);
app.route("/api/v1/todos/:id").patch(updateTask).delete(deleteTask);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
