const express = require("express");

const productController = require("../controllers/productController");
const { deletedMiddleware } = require("../middlewares/routeMiddlewares");
const filterValidator = require("../validators/productValidate");
const validate = require("../validators/validate");

const { getAllProducts, getFilteredProducts } = productController;

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter
  .route("/filter")
  .get(filterValidator, validate, getFilteredProducts);

module.exports = productRouter;
