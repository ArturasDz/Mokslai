const express = require("express");
const validator = require("../validators/validate");
const authorController = require("../controllers/authorController");
const authorValidatorr = require("../validators/authorValidate");

const {
  getAllAuthors,
  getAuthorFromId,
  postAuthor,
  patchAuthor,
  removeAuthor,
} = authorController;

const authorRouter = express.Router();

authorRouter.route("/").get(getAllAuthors).post(authorValidatorr, validator, postAuthor);
authorRouter.route("/:id").get(getAuthorFromId).patch(patchAuthor).delete(removeAuthor);

module.exports = authorRouter;
