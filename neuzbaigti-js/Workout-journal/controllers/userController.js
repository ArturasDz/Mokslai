const {
    getAllUsers,
    getUserById
  } = require("../models/userModel")

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };

// GET USER BY ID
exports.getUser = async (req, res) => {
    try {
      const id = +req.params.id;
      const user = await getUserById(id);
  
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "Invalid ID",
        });
      }
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };

// GET USER BY USERNAME

// GET USER PROFILE WITH JWT


// GET USERS WORKOUTS


// ADD A WORKOUT TO A USER


module.exports = router;
