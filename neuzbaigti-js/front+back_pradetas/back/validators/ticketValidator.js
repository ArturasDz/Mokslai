const {body} = require("express-validator");
const {findEmail} = require("../models/appModel");

const ticketValidator = [
    body("fullname")
    .isString()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage("Fullname must be at least 3 characters long"),
    body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is not valid")
    .custom(async (email) => {
        const emailExists = await findEmail(email);
        if (emailExists) {
            throw new Error("Email already exists");
        }
        return true;
    }),
    body("gitusername")
    .isString()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage("Git username must be at least 3 characters long"),
]

module.exports = ticketValidator