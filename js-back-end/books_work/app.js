const express = require("express");
const {sayHello, addRequestedDate} = require("./middlewares/appMiddlewares")
const bookRouter = require("./routers/bookRouter")

//server
const app = express();

app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/books", bookRouter)

module.exports = app


