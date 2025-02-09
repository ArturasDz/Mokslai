const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getUserById } = require("../models/userModel");
const AppError = require("../utils/appError");
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

//1. user signup and then Login function
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Validacija
    if (!username || !email || !password) {
      throw new AppError("Please provide username, email and password", 400);
    }

    // Patikriname, ar vartotojas su tokiu email jau egzistuoja
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    // Hash password
    const hash = await argon2.hash(password);

    // Kuriame naują vartotoją
    const newUser = {
      username,
      email,
      password: hash,
      role: role || 'patient' // Default role
    };

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("Error creating user", 500);
    }

    // Generuojame token
    const token = signToken(createdUser.id);
    sendCookie(token, res);

    // Paslepiame slaptažodį
    createdUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

//2. user login function
exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendCookie(token, res);

    // hide user password and id before sending to client
    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//3. authentification middleware, protecting routes from unregistered user

exports.protect = async (req, res, next) => {
  try {
    console.log(req);

    //you need to istall cookie-parser and write middleware to use req.cookies
    let token = req.cookies?.jwt;

    if (!token) {
      throw new AppError(
        "You are not logged in! Please log in to get accessssss.",
        401
      );
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await getUserById(decoded.id);
    if (!currentUser) {
      throw new AppError(
        "The user belonging to this token does no longer exist.",
        401
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE, add user to req object
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.allowAccessTo = (...roles) => {
  // const roles = ["admin", "editor", "user"];
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError(
          "You do not have permission to perform this action",
          403
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.logout = (req, res) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "You're now logged out." });
};

exports.getAuthenticatedUser = (req, res, next) => {
  try {
    const authedUser = req.user;
    authedUser.password = undefined;
    res.status(200).json({ 
      status: "success", 
      data: authedUser 
    });
  } catch (error) {
    next(error);
  }
};