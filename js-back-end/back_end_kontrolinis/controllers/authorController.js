const {
  getEveryAuthor,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../models/authorModel");
const AppError = require("../utils/appError");

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await getEveryAuthor();
    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (error) {
    next(error);
  }         
}

exports.getAuthorFromId = async (req, res, next) => {
  try {
    const authorid = +req.params.id;
    if (!authorid || isNaN(authorid)) {
      throw new AppError("Invalid author id", 400);
    }
    const author = await getAuthorById(authorid);
    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (error) {
    next(error);
  }
}

exports.postAuthor = async (req, res, next) => {
  try {
    const author = req.body;
    const newAuthor = await createAuthor(author);
    res.status(201).json({
      status: "success",
      data: newAuthor,
    });
  } catch (error) {
    next(error);
  } 
}

exports.patchAuthor = async (req, res, next) => {
  try {
    const authorid = +req.params.id;
    if (!authorid || isNaN(authorid)) {
      throw new AppError("Invalid author id", 400);
    }
    const author = req.body;
    const updatedAuthor = await updateAuthor(authorid, author);
    res.status(200).json({
      status: "success",
      data: updatedAuthor,
    });
  } catch (error) {
    next(error);
  }
}

exports.removeAuthor = async (req, res, next) => {
  try {
    const authorid = +req.params.id;
    if (!authorid || isNaN(authorid)) {
      throw new AppError("Invalid author id", 400);
    }
    const deletedAuthor = await deleteAuthor(authorid);
    res.status(200).json({
      status: "success",
      data: deletedAuthor,
    });
  } catch (error) {
    next(error);
  }
}