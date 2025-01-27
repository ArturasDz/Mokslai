const { sql } = require("../dbConnection");

exports.getEveryAuthor = async () => {
    const authorsList = await sql`
    SELECT authors.*
    FROM authors
    `;
    return authorsList;
};

exports.getAuthorById = async (authorid) => {
    const [author] = await sql`
    SELECT authors.*
    FROM authors
    WHERE author_id = ${authorid}
    `;
    return author;
};

exports.createAuthor = async (newAuthor) => {
    const columns = ["name", "birthdate", "biography"];
    const [createauthor] = await sql`
    INSERT INTO authors ${sql(newAuthor, columns)}
    RETURNING *
    `;
    return createauthor;
};

exports.updateAuthor = async (id, newAuthor) => {
    const columns = ["name", "birthdate", "biography"];
    const [editauthor] = await sql`
    UPDATE authors set ${sql(newAuthor, columns)}
    WHERE authors.id = ${id}
    RETURNING *
    `;
    return editauthor;
};

exports.deleteAuthor = async (id) => {
    const [deleteauthor] = await sql`
    DELETE FROM authors
    WHERE authors.id = ${id}
    RETURNING *
    `;
    return deleteauthor;
};

exports.getAuthorByName = async (name) => {
    const [author] = await sql`
    SELECT authors.*
    FROM authors
    WHERE authors.name = ${name}
    `;
    return author;
};