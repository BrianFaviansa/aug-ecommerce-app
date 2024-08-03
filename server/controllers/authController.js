import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./../middlewares/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const setCookie = (res, token) => {
  const isDev = process.env.NODE_ENV === "development" ? false : true;
  const cookieOption = {
    expire: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isDev,
  };
  res.cookie("jwt", token, cookieOption);
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isOwner = (await User.countDocuments()) === 0;
  const role = isOwner ? "owner" : "user";
  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = signToken(newUser._id);
  setCookie(res, token);

  newUser.password = undefined;
  res.status(201).json({
    message: "User registered successfully",
    data: newUser,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.comparePassword(password))) {
    const token = signToken(user._id);
    setCookie(res, token);

    user.password = undefined;
    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
