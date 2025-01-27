const { body } = require("express-validator");
const { getUserByName } = require("../models/userModel");

const userValidator = [
  body("name").notEmpty().withMessage("name is required")
  .custom(async (value) => {
    const user = await getUserByName(value);
    if (user) {
      throw new Error("User already exists");
    }
    return true;
  }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters long"),
  
]

module.exports = userValidator;
