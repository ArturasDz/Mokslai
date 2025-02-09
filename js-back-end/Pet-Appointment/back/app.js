const express = require("express");
const appointmentRouter = require("./routers/appointmentRouter");
const userRouter = require("./routers/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//server
const app = express();
//isparseina iš body į objektus (body parser)
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/v1/appointments", appointmentRouter );
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const error = new AppError("Not found", 404);
  next(error);
});

app.use(errorHandler);

module.exports = app;
