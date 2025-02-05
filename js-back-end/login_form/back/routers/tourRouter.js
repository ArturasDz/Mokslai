const express = require("express");

//IMPORT CONTROLLERS
const tourController = require("../controllers/tourController");
const { deletedMiddleware } = require("../middlewares/routeMiddlewares");
const { protect, allowAccessTo } = require("../controllers/authController");

const {
  getAllTours,
  getTour,
  postTour,
  updateTour,
  deleteTour,
  getToursByCategoryId,
  getToursByDifficultyId,
  getToursCountedByCat,
  getToursByCatAndDif,
  getFilteredTours
} = tourController;

//ROUTES
const tourRouter = express.Router();

//APRASOME ROUTES
tourRouter.route("/").get(getAllTours, protect, allowAccessTo("admin", "editor")).post(deletedMiddleware, postTour);
tourRouter.route("/filter").get(getFilteredTours)
tourRouter.route("/categories").get(getToursCountedByCat);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
tourRouter.route("/category/:categoryid").get(getToursByCategoryId);
tourRouter.route("/difficulty/:difficultyid").get(getToursByDifficultyId);
tourRouter.route("/category/:category/difficulty/:difficulty").get(getToursByCatAndDif)

module.exports = tourRouter;
