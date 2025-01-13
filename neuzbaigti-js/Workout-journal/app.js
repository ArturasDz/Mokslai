const express = require("express");
// const userRouter = require("./router/userRouter")
const workoutRouter = require("./router/workoutRouter")


//SERVER
const app = express();
app.use(express.json());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/workouts', workoutRouter);

module.exports = app