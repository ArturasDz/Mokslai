const express = require('express')
const authorRouter = require('./routers/authorRouter')
const bookRouter = require('./routers/bookRouter')
const userRouter = require('./routers/userRouter')
const AppError = require('./utils/appError')
const errorHandler = require('./middlewares/errorHandler')

//server
const app = express();

app.use(express.json());

app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/auth', userRouter)

app.use("*", (req, res, next) => {
    const error = new AppError("Route not found", 404);
    next(error);
})

app.use(errorHandler)


module.exports = app