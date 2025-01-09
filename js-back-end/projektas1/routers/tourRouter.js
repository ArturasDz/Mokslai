const express = require("express");

//IMPORT CONTROLLERS
const tourController = require("../controllers/tourController")
const {deletedMiddleware} = require('../middlewares/routeMiddlewares')

const {getAllTours, getTour, postTour, updateTour, deleteTour} = tourController

//ROUTES
const tourRouter = express.Router();

//APRASOME ROUTES
tourRouter.route('/').get(getAllTours).post(deletedMiddleware, postTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;