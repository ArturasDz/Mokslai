const { sql } = require("../dbConnection");

// GET ALL WORKOUTS
exports.getAllWorkouts = async () => {
  const workouts = await sql`
    SELECT *
    FROM workouts
  `;
  return workouts;
};

// GET WORKOUT BY ID
exports.getWorkoutById = async (id) => {
  const workout = await sql`
    SELECT *
    FROM workouts
    WHERE id = ${id}
  `;
  return workout[0]; 
};

// UPDATE WORKOUT
exports.updateWorkout = async (id, name) => {
  const result = await sql`
    UPDATE workouts
    SET name = ${name}
    WHERE id = ${id}
    RETURNING *
  `;
  return result.length; 
};

// DELETE WORKOUT
exports.deleteWorkout = async (id) => {
  const result = await sql`
    DELETE FROM workouts
    WHERE id = ${id}
    RETURNING *
  `;
  return result.length; 
};

// ADD WORKOUT TO USER
exports.addWorkoutToUser = async (userId, name) => {
  const newWorkout = await sql`
    INSERT INTO workouts (user_id, name)
    VALUES (${userId}, ${name})
    RETURNING id
  `;
  return newWorkout[0].id; 
};

// GET WORKOUTS BY USER ID
exports.getWorkoutsByUserId = async (userId) => {
  const workouts = await sql`
    SELECT *
    FROM workouts
    WHERE user_id = ${userId}
  `;
  return workouts;
};
