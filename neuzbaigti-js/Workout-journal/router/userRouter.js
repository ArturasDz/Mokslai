const express = require("express");

const userController = require("../controllers/userController")

const {getAllUsers, getUserById, getUserByUsername, getUserWithJwt, getUserWorkouts, postWorkoutToUser  } = userController

const userRouter = express.Router();

userRouter.routes('/').get(getAllUsers).get(getUserById).get(getUserByUsername).get(getUserWithJwt).get(getUserWorkouts).post(postWorkoutToUser)

Module.exports = userRouter