const User = require("../models/user.model");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json("No users found");
    }
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ messsage: "User not found." });
    }
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).send("All inputs are required.");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User Already Exists.");
    } else {
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        bio,
      });
      res.status(201).json({ user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;

    await user.save();
    res.json({
      success: "user updated successfully.",
      userUpdated: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id }).orFail();
    res.json({ messsage: "user removed successfully.", user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.countDocuments();
    res.json({ allUser });
  } catch (error) {
    next(error);
  }
};

const topActiveUser = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      { $project: { name: 1, postCount: { $size: "$posts" } } },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
    ]);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  topActiveUser,
};
