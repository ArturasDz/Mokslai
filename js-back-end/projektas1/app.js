const express = require("express");
const {sayHello, addRequestedDate} = require("./middlewares/appMiddlewares")
const tourRouter = require("./routers/tourRouter")

//server
const app = express();
//isparseina iš body į objektus (body parser)
app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/tours", tourRouter)

module.exports = app


