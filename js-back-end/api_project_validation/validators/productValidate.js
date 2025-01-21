const { query } = require("express-validator");

const filterValidator = [
  query("price")
    .optional()
    .isFloat({ min: 0, decimal_digits: 2 })
    .withMessage("Price must be a positive number")
    .toFloat(),
  query("category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a non-empty string"),
];

module.exports = filterValidator;
