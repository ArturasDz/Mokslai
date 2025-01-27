const express = require("express");
const validate = require("../validators/validate");
const validateUser = require("../validators/loginValidate");
const validateReg = require("../validators/registerValidate");
const {loginUser, registerUser} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/register").post(validateReg, validate, registerUser)
userRouter.route("/login").post(validateUser, validate, loginUser)
module.exports = userRouter