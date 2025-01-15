// module.exports = workouts;
const { sql } = require("../dbConnection");

//GET ALL USERS
exports.getAllUsers = async () => {
    const UserList = await sql`
      SELECT workouts.*
      FROM workouts
      RETURNING *
      `;
  
    return UserList;
  };

  //GET USER BY ID
exports.getUserById = async (id) => {
    const users = await sql`
  SELECT workouts.*
  FROM workouts
  WHERE workouts.id = ${id}
  `;
  
    return users[0]; //users is array
  };

  // GET USER BY USERNAME
exports.getUserByUsername = async (username) => {
  const user = await sql`
    SELECT *
    FROM users
    WHERE username = ${username}
  `;
  return user[0]; 
};

// CREATE USER
exports.createUser = async ({ username, password, email }) => {
  const newUser = await sql`
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${password}, ${email})
    RETURNING *
  `;
  return newUser[0];
};

// LOGIN USER
exports.loginUser = async ({ username, password }) => {
  const user = await sql`
    SELECT *
    FROM users
    WHERE username = ${username} AND password = ${password}
  `;
  return user[0];
};

// GET LOGGED-IN USER PROFILE
exports.getUserProfile = async (userId) => {
  const user = await sql`
    SELECT *
    FROM users
    WHERE id = ${userId}
  `;
  return user[0]; 
};
  