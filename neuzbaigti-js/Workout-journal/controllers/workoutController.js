const express = require('express');
const fs = require('fs');
const router = express.Router();
const workoutsPath = './data/workouts.json';

// GET ALL WORKOUTS
exports.getAllWorkouts = (req, res) => {
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));
    res.status(200).json(workouts);
};

// GET WORKOUT BY ID
exports.getWorkoutById = (req, res) => {
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));
    const workout = workouts.find(workout => workout.id == req.params.id);

    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
};

// EDIT WORKOUT
exports.editWorkout = (req, res) => {
    const { name } = req.body;
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));

    const workoutIndex = workouts.findIndex(workout => workout.id == req.params.id);
    if (workoutIndex === -1) return res.status(404).json({ message: 'Workout not found' });

    workouts[workoutIndex].name = name || workouts[workoutIndex].name;
    fs.writeFileSync(workoutsPath, JSON.stringify(workouts, null, 2));

    res.status(200).json({ message: 'Workout updated successfully', workout: workouts[workoutIndex] });
};

// DELETE WORKOUT
exports.deleteWorkout = (req, res) => {
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));

    const workoutIndex = workouts.findIndex(workout => workout.id == req.params.id);
    if (workoutIndex === -1) return res.status(404).json({ message: 'Workout not found' });

    const deletedWorkout = workouts.splice(workoutIndex, 1);
    fs.writeFileSync(workoutsPath, JSON.stringify(workouts, null, 2));

    res.status(200).json({ message: 'Workout deleted successfully', workout: deletedWorkout });
};

module.exports = router;
