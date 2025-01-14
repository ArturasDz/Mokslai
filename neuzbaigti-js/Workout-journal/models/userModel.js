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
  