const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const [user] = await sql`
INSERT INTO users ${sql(newUser, "username", "email", "password")}
RETURNING *     
`;
  return user;
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.email = ${email}
    `;
  return user;
};
