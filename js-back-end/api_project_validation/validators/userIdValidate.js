const { param } = require("express-validator");

const userIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt({ min: 1 })
    .withMessage("Id must be a numeric value")
    .toInt(),
];

module.exports = userIdValidator;
