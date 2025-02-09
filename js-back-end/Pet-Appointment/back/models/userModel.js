const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  try {
    const [user] = await sql`
      INSERT INTO users (
        username,
        email,
        password,
        role
      ) VALUES (
        ${newUser.username},
        ${newUser.email},
        ${newUser.password},
        ${newUser.role}
      )
      RETURNING id, username, email, role
    `;
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const [user] = await sql`
      SELECT * FROM users 
      WHERE email = ${email}
    `;
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT * FROM users 
    WHERE id = ${id}
  `;
  return user;
};