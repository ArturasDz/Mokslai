const {
  getWorkoutsByUserId,
  addWorkoutToUser,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../models/workoutModel");

// GET ALL WORKOUTS
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET WORKOUT BY ID
exports.getWorkoutFromId = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await getWorkoutById(id);
    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// UPDATE WORKOUT
exports.upWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCount = await updateWorkout(id, name);
    if (updatedCount === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedCount,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// DELETE WORKOUT
exports.delWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await deleteWorkout(id);
    if (deletedCount === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "The selected workout was removed",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ADD WORKOUT TO USER
exports.addWorkoutToU = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const newWorkoutId = await addWorkoutToUser(id, name);
    res.status(201).json({
      status: "success",
      data: newWorkoutId,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET WORKOUTS BY USER ID
exports.getWorkoutsByUId = async (req, res) => {
  try {
    const { id } = req.params;
    const workouts = await getWorkoutsByUserId(id);
    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};