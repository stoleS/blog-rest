const User = require("../models/user");
const { errMsg } = require("../helpers/errorHelpers");

module.exports = {
  // Get all users from database
  index: async (req, res, next) => {
    await User.find({}, (err, users) => {
      // Return users
      if (err || users.length === 0) {
        return next(errMsg("There are no users in database."));
      }
      res.status(200).json(users);
    });
  },

  // Create new user
  newUser: async (req, res, next) => {
    // Get user data from req body
    const newUser = new User(req.value.body);
    // Save the user to database
    const user = await newUser.save();
    // Return created user in response
    res
      .status(201)
      .json({ message: "User has been successfully created.", user: user });
  },

  // Get user by ID
  getUser: async (req, res, next) => {
    // Get user id from params
    const { userId } = req.value.params;
    // Search for the user in database
    await User.findById(userId, (err, user) => {
      // Return user
      if (err || !user) {
        return next(errMsg(`Can't find user with id: ${userId}.`));
      }
      res.status(200).json(user);
    });
  },

  // Update user
  updateUser: async (req, res, next) => {
    const { userId } = req.value.params;
    // Get new user data
    const update = req.value.body;
    // Find and update the user
    await User.findByIdAndUpdate(userId, update, (err, user) => {
      if (err || !user) {
        return next(
          errMsg(`Can't update user with id: ${userId}, it doesn't exist.`)
        );
      }
      res.status(200).json({ message: "User successfully updated." });
    });
  },

  // Delete user
  deleteUser: async (req, res, next) => {
    const { userId } = req.value.params;
    // Find and remove the user
    await User.findByIdAndRemove(userId, (err, user) => {
      if (err || !user) {
        return next(
          errMsg(`Can't delete user with id: ${userId}. User doesn't exist.`)
        );
      }
      res.status(200).json({ message: "User successfully deleted.", user });
    });
  },

  // Get user favourite categories
  userCategories: async (req, res, next) => {
    const { userId } = req.value.params;
    // Find the user
    await User.findById(userId, (err, user) => {
      if (err || !user) {
        return next(
          errMsg("Can't find categories of selected user. User doesn't exist.")
        );
      }
      res.status(200).json({ favCategories: user.favCategories });
    });
  },

  // Update favourites category of the user
  updateUserCategories: async (req, res, next) => {
    const { userId } = req.value.params;
    const categories = req.value.body;

    await User.findByIdAndUpdate(userId, categories, (err, user) => {
      if (err || !user) {
        return next(
          errMsg(
            `Can't update categories of an user with id: ${userId}. User doesn't exist.`
          )
        );
      }
      res
        .status(200)
        .json({ message: "User categories successfully updated." });
    });
  }
};
