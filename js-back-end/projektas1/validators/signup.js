const { body } = require("express-validator");
const { getUserByEmail } = require("../models/userModel");

const validatorNewUser = [
  body().notEmpty().withMessage("User body must contain data "),

  body("username").notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm)
        throw new Error("Passwords do not match");
      return true
    }),
];
module.exports = validatorNewUser;
