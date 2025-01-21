const { body } = require("express-validator");

const userValidator = [
  body("email")
    .notEmpty()
    .withMessage("Password is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters long"),
  body("age")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Age must be a positive integer.")
    .toInt(),
];

module.exports = userValidator;
