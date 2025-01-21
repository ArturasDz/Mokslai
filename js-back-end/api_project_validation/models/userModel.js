const { sql } = require("../dbConnection");

exports.checkUserExists = async (email) => {
  const result = await sql`
        SELECT *
        FROM users 
        WHERE email = ${email}
    `;
  return result.length > 0;
};

exports.createUser = async (name, email, password, age) => {
  const result = await sql`
        INSERT INTO users (name, email, password, age)
        VALUES (${name}, ${email}, ${password}, ${age})
    `;
  return result[0];
};

exports.getUserById = async (id) => {
  const result = await sql`
        SELECT *
        FROM users
        WHERE id = ${id}
    `;
  return result[0];
};
