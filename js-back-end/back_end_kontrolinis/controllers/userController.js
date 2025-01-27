const argon2 = require("argon2");
const { createUser, getUserByName } = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");


const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token;
}

const sendCookie = (token, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res.cookie("jwt", token, cookieOptions);
}

exports.registerUser = async (req, res, next) => {

    try {
        const newUser = req.body;
        const hash = await argon2.hash(newUser.password);
        if (!newUser.name) {
            
        }
        newUser.password = hash;
        const createdUser = await createUser(newUser);
        const token = signToken(createdUser.id);
        sendCookie(token, res);
        createdUser.password = undefined;
        res.status(201).json({
            status: "success",
            data: createdUser,
        });
    } catch (error) {
        next(error);
    }

}

exports.loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await getUserByName(name);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        const passwordconfirm = await argon2.verify(user.password, password);
        if (!passwordconfirm) {
            throw new AppError("Invalid password", 400);
        }
        const token = signToken(user.id);
        sendCookie(token, res);
        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}
// exports.registerUser = async (req, res, next) => {
//     try {
//         const newUser = req.body;
//         const hash = await argon2.hash(newUser.password);
//         newUser.password = hash;
//         const sendCookie = await sendCookie(token, res);
//         const createdUser = await createUser(newUser);
//         res.status(201).json({
//             status: "success",
//             data: createdUser,
//         });
//     } catch (error) {
//         next(error);
//     }
// }
  
 
// exports.loginUser = async (req, res, next) => {
//     try {
//         const { name, password } = req.body;
//         const user = await getUserByName(name);
//         if (!user) {
//             throw new AppError("User not found", 404);
//         }
//         const passwordconfirm = await argon2.verify(user.password, password);
//         if (!passwordconfirm) {
//             throw new AppError("Invalid password", 400);
//         }
//         const token = signToken(user.id);
//         sendCookie(token, res);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 id: user.id,
//                 name: user.name,
//                 token,
//             },
//         });
//     } catch (error) {
//         next(error);
//     }
// }
