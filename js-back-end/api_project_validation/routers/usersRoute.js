const express = require("express");

const userController = require("../controllers/userController");
const { deletedMiddleware } = require("../middlewares/routeMiddlewares");
const userValidator = require("../validators/registerValidate");
const userIdValidator = require("../validators/userIdValidate");
const validate = require("../validators/validate");

const { registerUser, getUserFromId } = userController;

const userRouter = express.Router();

userRouter.route("/").post(userValidator, validate, registerUser);
userRouter.route("/:id").get(userIdValidator, validate, getUserFromId);

module.exports = userRouter;
