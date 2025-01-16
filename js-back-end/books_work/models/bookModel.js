const { sql } = require("../dbConnection");

//GET ALL TOURS
exports.getAllBooks = async () => {
  const bookList = await sql`
      SELECT books.*
      FROM books
      `;
  return bookList;
};

exports.filterBooks = async (filter, limit, offset) => {
  const result = await sql.begin(async sql => {
  // const validDirection = ["ASC", "DESC"];
  // const sortValue = filter.sort.toUpperCase();
  // const sortDirection = validDirection.includes(sortValue) ? sortValue : "ASC";
  let Clauses = [];
  let queryParams = [];

  if (filter.author) {
    Clauses.push("LOWER(books.author) = LOWER(${author})");
    queryParams.push(filter.author);
  }
  if (filter.genre) {
    Clauses.push("LOWER(books.genre) = LOWER(${genre})");
    queryParams.push(filter.genre);
  }
  if (filter.year) {
    Clauses.push("books.year = ${year}");
    queryParams.push(filter.year);
  }

  const books = await sql`
  select books.*
  FROM books
  ${
    limit !== undefined && offset !== undefined
      ? sql`limit ${limit} offset ${offset}`
      : sql``
  }
  `;
  const [total] = await sql`
    SELECT COUNT(*)
    FROM books
    `;
    
return {books, totalCount: total}
})
  return result;
};
// ORDER BY books.year ${sql.unsafe(sortDirection)}

// WHERE LOWER(books.author) = LOWER(${filter.author})
// AND LOWER(books.genre) = LOWER(${filter.genre})
// AND books.year = ${filter.year}
