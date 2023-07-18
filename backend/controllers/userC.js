const User = require("../Models/User");

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getSingleUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const update = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user is deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
