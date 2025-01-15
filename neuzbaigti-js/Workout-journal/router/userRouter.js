const express = require("express");

// IMPORT CONTROLLERS
const userController = require("../controllers/userController");
const { deletedMiddleware } = require("../middlewares/routeMiddlewares");

const {
  getUsers,
  getUser,
  getByUsername,
  makeUser,
  logUser,
  // getUserProfile,
} = userController;

// ROUTES
const userRouter = express.Router();

// USER ROUTES
userRouter.route("/").get(getUsers)
userRouter.route("/register").post(deletedMiddleware, makeUser)
userRouter.route("/login").post(logUser);
userRouter.route("/users").get(getUser).get(getByUsername);

module.exports = userRouter;
