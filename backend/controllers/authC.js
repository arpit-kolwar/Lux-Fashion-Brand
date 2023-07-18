const User = require("../Models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/Error");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !validator.isEmail(req.body.email)) {
    return next(createError(400, "enter valid email"));
  }
  if (!username) {
    return next(createError(400, "please provide username"));
  }
  if (!password) {
    return next(createError(400, "please provide password"));
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });
    if (!newUser.$isValid) {
      return next(createError(400, "Invalid user data"));
    }
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

///Login
const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "user not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(401, "Invalid credentials"));
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TIME,
    });
    const { password, isAdmin, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, userLogin };
