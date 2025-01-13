const express = require("express");

const workoutController = require("../controllers/workoutController");

const { getAllWorkouts, getWorkoutById, editWorkout, deleteWorkout } =
  workoutController;

const workoutRouter = express.Router();

workoutRouter
  .route("/")
  .get(getAllWorkouts)
  .get(getWorkoutById)
  .patch(editWorkout)
  .delete(deleteWorkout);

Module.exports = workoutRouter;
