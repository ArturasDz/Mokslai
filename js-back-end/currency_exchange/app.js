const express = require("express");

const {sayHello, addRequestedDate} = require("./middlewares/appMiddlewares");
const currencyRouter = require("./routers/currencyRouter");

//server
const app = express();
app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/exchange-rates", currencyRouter)

module.exports = app;