const {
  createUser,
  checkUserExists,
  getUserById,
} = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;

    // CHECK IF USER ALREADY EXISTS IN THE DB
    const existingUser = await checkUserExists(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // CREATE NEW USER
    const newUser = await createUser(name, email, password, age);
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        age: newUser.age,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserFromId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
