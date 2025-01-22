const express = require("express");
const {signup} = require("../controllers/authController")
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");


const router = express.Router();


router.route('/signup').post(validateNewUser, validate, signup)

module.exports = router