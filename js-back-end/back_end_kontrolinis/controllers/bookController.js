const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  filterBooks,
  findBookByAuthorId
} = require("../models/bookModel");
const AppError = require("../utils/appError");

exports.getEveryBooks = async (req, res, next) => {

  try {
    const filter = req.query;
    let page = parseInt(filter.page)
    let limit = parseInt(filter.limit)
    const offset = (page - 1) * limit;
    if (page < 1 || limit < 1) {
      throw new AppError("Invalid page or limit", 400);
    }
    const books = await getAllBooks(limit, offset);
    res.status(200).json({
      status: "success",
      data: books.booksList,
      total: books.total,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookFromId = async (req, res, next) => {
  try {
    const  bookid  = +req.params.id;
    if (!bookid || isNaN(bookid)) {
      throw new AppError("Invalid book id", 400);
    }
    const book = await getBookById(bookid);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

exports.postBook = async (req, res, next) => {
  try {
    const book = req.body;
    const newBook = await createBook(book);
    res.status(201).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.patchBook = async (req, res, next) => {
  try {
    const bookid  = +req.params.id;
    if (!bookid || isNaN(bookid)) {
      throw new AppError("Invalid book id", 400);
    }
    const book = req.body;
    const updatedBook = await updateBook(bookid, book);
    res.status(200).json({
      status: "success",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeBook = async (req, res, next) => {
  try {
    const bookid = +req.params.id;
    if (!bookid || isNaN(bookid)) {
      throw new AppError("Invalid book id", 400);
    }
    const deletedBook = await deleteBook(bookid);
    res.status(200).json({
      status: "success",
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookFromAuthorId = async (req, res, next) => {
try {
const { authorid } = req.params;
if ( !authorid || isNaN(authorid)) {
  throw new AppError("Invalid author id", 400);
}
const books = await findBookByAuthorId(authorid);
res.status(200).json({
  status: "success",
  data: books,
});
} catch (error) {
  next(error);
}
};