const {body} = require("express-validator");
const { getAuthorByName } = require("../models/authorModel");

const authorValidator = [
    body("name").notEmpty().withMessage("name is required")
    .custom(async (value) => {
        const author = await getAuthorByName(value);
        if (author) {
            throw new Error("Author already exists");
        }
        return true;
    }),
    body("birthdate").notEmpty().withMessage("birthdate is required")
    .isDate().withMessage("birthdate must be a date"),
    body("biography").optional(),
]

module.exports = authorValidator