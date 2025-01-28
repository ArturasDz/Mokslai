const express = require("express");
const validate = require("../validators/validate");
const ticketController = require("../controllers/appController");
const ticketValidator = require("../validators/ticketValidator");
const { postTicket } = ticketController

const appRouter = express.Router();
appRouter.route("/register").post(ticketValidator, validate, postTicket)

module.exports = appRouter;