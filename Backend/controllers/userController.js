import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or password" });
    throw new Error("Invalid Email or Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.Isadmin,
    });
  } else {
    res.status(404).send({ message: "user not found" });
    throw new Error("User not Found");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send({ message: "user already exists" });
    throw new Error("User Already Exists");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.Isadmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send({ message: "Invalid User Data" });
    throw new Error("Invalid User Data");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.IsAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404).send({ message: "user not found" });
    throw new Error("User Not Found");
  }
});

export { authController, getUserProfile, registerUser, updateUserProfile };
