const { getAllBooks, filterBooks } = require("../models/bookModel");

//GET ALL BOOKS
exports.getAllBookss = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//FILTER BOOKS USING QUERY STRING
exports.getFilteredBooks = async (req, res) => {
  try {
    const filter = req.query;
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);
    console.log(filter)

    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid page or limit value",
      });
    }

    const filteredBooks = await filterBooks(filter, limit, offset);
    if (filteredBooks.length === 0) {
      const allBooks = await getAllBooks();
      return res.status(200).json({
        status: "success",
        filtered: allBooks,
      });
    }
    res.status(200).json({
      status: "success",
      filtered: filteredBooks.books,
      total: filteredBooks.totalCount.count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
