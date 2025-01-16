const express = require("express");

//IMPORT CONTROLLERS
const bookController = require("../controllers/bookController")
const {deletedMiddleware} = require('../middlewares/routeMiddlewares')

const {getAllBookss, getFilteredBooks} = bookController

//ROUTES
const bookRouter = express.Router();

//APRASOME ROUTES
bookRouter.route('/').get(getAllBookss)
bookRouter.route('/filter').get(getFilteredBooks)

module.exports = bookRouter;