const { allProducts, filterProducts } = require("../models/productModel");
const AppError = require("../utils/appError");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await allProducts();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
exports.getFilteredProducts = async (req, res, next) => {
  try {
    const filter = req.query;

    if (Object.keys(filter).length === 0) {
      const products = await allProducts();
      res.status(200).json({
        status: "success",
        data: products,
      });
      return;
    }

    const allowFields = ["category", "price"];
    for (const key of Object.keys(filter)) {
      if (!allowFields.includes(key)) {
        throw new AppError("Invalid filter field", 400);
      }
    }

    if (!Number(filter.price) || filter.price < 0) {
      throw new AppError("Price must be a positive number", 400);
    }

    const filteredProducts = await filterProducts(filter);
    res.status(200).json({
      status: "success",
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
};
