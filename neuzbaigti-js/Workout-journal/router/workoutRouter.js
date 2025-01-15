const express = require("express");

// IMPORT CONTROLLERS
const workoutController = require("../controllers/workoutController");

const {
  getWorkouts,
  getWorkoutFromId,
  upWorkout,
  delWorkout,
  addWorkoutToU,
  getWorkoutsByUId,
} = workoutController;

// ROUTES
const workoutRouter = express.Router();

// WORKOUT ROUTES
workoutRouter.route("/").get(getWorkouts);
workoutRouter.route("/workouts").get(getWorkoutFromId).patch(upWorkout).delete(delWorkout);
workoutRouter.route("/user/:id").get(getWorkoutsByUId).post(addWorkoutToU);

module.exports = workoutRouter;
