const express = require("express");
const {sayHello, addRequestedDate} = require("./middlewares/appMiddlewares")
// const userRouter = require("./router/userRouter")
const workoutRouter = require("./router/workoutRouter")


//SERVER
const app = express();
app.use(express.json());


app.use(sayHello, addRequestedDate);

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/workouts', workoutRouter);

module.exports = app