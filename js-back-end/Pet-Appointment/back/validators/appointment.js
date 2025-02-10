const { body } = require("express-validator");

const validateNewAppointment = [
  body("name").notEmpty().withMessage("Name is required"),
  body("owner").notEmpty().withMessage("Owner is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("notes").notEmpty().withMessage("Notes are required"),
];

module.exports = validateNewAppointment;
