const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  getUserProfile,
} = require("../models/userModel");

// GET ALL USERS
exports.getUsers = async (req, res) => {
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
        message: "User not found",
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
exports.getByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
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

// CREATE USER
exports.makeUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await createUser({ username, password, email });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// LOGIN USER
exports.logUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser({ username, password });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid name or password!",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You are logged in!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET LOGGED-IN USER PROFILE
// exports.getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // USER ID IS STORED IN req.user
//     const user = await getUserProfile(userId);
//     if (!user) {
//       return res.status(404).json({
//         status: "fail",
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };
//WORKOUT MODULE 

