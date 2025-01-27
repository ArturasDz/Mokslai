const { body } = require("express-validator");

const validatorUser = [
  body().notEmpty().withMessage("User body must contain data "),

  body("name").notEmpty().withMessage("name is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm)
        throw new Error("Passwords do not match");
      return true
    }),
];
module.exports = validatorUser;
