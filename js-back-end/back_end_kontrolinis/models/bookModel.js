const { sql } = require("../dbConnection");

exports.getAllBooks = async (limit, offset) => {
  const result = await sql.begin(async (sql) => {
    const booksList = await sql`
    SELECT books.*
    FROM books
    ${
      limit !== undefined && offset !== undefined
        ? sql`limit ${limit} offset ${offset}`
        : ""
    }
    `;
    const [total] = await sql`
    SELECT COUNT(*) AS total
    FROM books
    `;
    return {
      booksList,
      total,
    };
  });
  return result;
};

exports.getBookById = async (bookid) => {
  const [book] = await sql`
    SELECT books.*
    FROM books
    WHERE books.book_id = ${bookid}
    `;
  return book;
};

exports.createBook = async (newBook) => {
  const columns = ["title", "summary", "isbn", "authorid"];
  const [createbook] = await sql`
    INSERT INTO books ${sql(newBook, columns)}
    RETURNING *
    `;
  return createbook;
};

exports.updateBook = async (id, newBook) => {
  const columns = ["title", "summary", "isbn", "authorid"];
  const [editbook] = await sql`
    UPDATE books set ${sql(newBook, columns)}
    WHERE books.book_id = ${id}
    RETURNING *
    `;
  return editbook;
};

exports.deleteBook = async (id) => {
  const [deletebook] = await sql`
    DELETE FROM books
    WHERE books.book_id = ${id}
    RETURNING *
    `;
  return deletebook;
};

exports.filterBooks = async (filter) => {
  const sortValue = filter.sort.toUpperCase();
  const validDirections = ["ASC", "DESC"];
  const sortDirection = validDirections.includes(sortValue) ? sortValue : "ASC";
  const [books] = await sql`
    SELECT books.*
    FROM books
    JOIN authors ON books.author_id = authors.id
    WHERE 
    books.title ILIKE${filter.title} AND
    authors.id = ${filter.authorid}
    ORDER BY books.title ${sql.unsafe(sortDirection)}

    `;
  return books;
};

exports.findBookByAuthorId = async (authorid) => {
  const [books] = await sql`
    SELECT books.*
    FROM books
    JOIN authors ON books.author_id = authors.author_id
    WHERE books.authorid = ${authorid}
    `;
  return books;
};