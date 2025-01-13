const express = require('express');
const fs = require('fs');
const router = express.Router();
const usersPath = './data/users.json';
const workoutsPath = './data/workouts.json';

// GET ALL USERS
exports.getAllUsers = (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    res.status(200).json(users);
};

// GET USER BY ID
exports.getUserById = (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const user = users.find(user => user.id == req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
};

// GET USER BY USERNAME
exports.getUserByUsername = (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const user = users.find(user => user.username === req.params.username);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
};

// GET USER PROFILE WITH JWT
exports.getUserWithJwt = (req, res) => {
    // JWT handling would normally go here.
    res.status(200).json({ message: 'JWT-based user profile route (not implemented)' });
};

// GET USERS WORKOUTS
exports.getUserWorkouts = (req, res) => {
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));
    const userWorkouts = workouts.filter(workout => workout.userId == req.params.id);

    res.status(200).json(userWorkouts);
};

// ADD A WORKOUT TO A USER
exports.postWorkoutToUser = (req, res) => {
    const { name } = req.body;
    const workouts = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));

    const newWorkout = { id: Date.now(), userId: req.params.id, name, date: new Date() };
    workouts.push(newWorkout);
    fs.writeFileSync(workoutsPath, JSON.stringify(workouts, null, 2));

    res.status(201).json({ message: 'Workout added successfully', workout: newWorkout });
};

module.exports = router;
