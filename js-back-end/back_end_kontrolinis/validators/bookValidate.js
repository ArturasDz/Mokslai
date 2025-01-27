const { body } = require("express-validator");
const { getAuthorById } = require("../models/authorModel");

const bookValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("summary").optional(),
  body("isbn").notEmpty().withMessage("isbn is required"),
  body("authorid")
    .notEmpty()
    .withMessage("authorid is required")
    .custom(async (id) => {
      const author = await getAuthorById(id);
      if (!author) {
        throw new Error("Author not found");
      }
      return true;
    }),
];

module.exports = bookValidator;