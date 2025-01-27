const express = require("express");
const validate = require("../validators/validate");
const bookController = require("../controllers/bookController");
const bookValidator = require("../validators/bookValidate");

const { getEveryBooks, getBookFromAuthorId,getBookFromId, postBook, patchBook, removeBook,} =
  bookController;

const bookRouter = express.Router();

bookRouter.route("/").get(getEveryBooks).post(bookValidator, validate, postBook)
bookRouter.route("/:id").get(getBookFromId).patch(patchBook).delete(removeBook);
bookRouter.route("/authorid/:id").get(getBookFromAuthorId);
bookRouter.route("filter")
module.exports = bookRouter;
