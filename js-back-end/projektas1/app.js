const express = require("express");
const { sayHello, addRequestedDate } = require("./middlewares/appMiddlewares");
const tourRouter = require("./routers/tourRouter");
const userRouter = require("./routers/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");
//server
const app = express();
//isparseina iš body į objektus (body parser)
app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    // const error = new Error("Not found");
    // error.status = "fail";
    // error.statusCode = 404;
    const error = new AppError("Not found", 404);
  
    next(error);
  });
  
  app.use(errorHandler);

module.exports = app;
