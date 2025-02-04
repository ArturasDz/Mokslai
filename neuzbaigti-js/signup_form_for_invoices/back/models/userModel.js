const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const [user] = await sql`
INSERT INTO users ${sql(newUser, "username", "email", "password", "role")}
RETURNING *     
`;
  return user;
};

exports.getUserByEmail = async (email) => {
  const users = await sql`
  SELECT * FROM users WHERE email = ${email}
`;
return users[0];
};

exports.getUserById = async (id) => {
  const users = await sql`
  SELECT * FROM users WHERE id = ${id}
`;
return users[0];
};
