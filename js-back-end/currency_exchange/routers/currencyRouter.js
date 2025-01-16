const express = require("express");

const currencyController = require("../controllers/currencyController");
const { deletedMiddleware } = require("../middlewares/routeMiddlewares");
const { getRateBasedOnCurrency } = currencyController

const currencyRouter = express.Router();

currencyRouter.route("/:base").get(getRateBasedOnCurrency).post(deletedMiddleware);