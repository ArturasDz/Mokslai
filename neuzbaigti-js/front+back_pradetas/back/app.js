const express = require("express");
const AppError = require("./utils/appError");
const appRouter = require("./routes/appRouter")
const errorHandler = require("./middlewares/errorHandler");

const app = express();


app.use(express.json());

app.use('/ticket-generator', appRouter)

app.use("*", (req, res, next) => {
    const error = new AppError("Route not found", 404);
    next(error);
})

app.use(errorHandler)


module.exports = app