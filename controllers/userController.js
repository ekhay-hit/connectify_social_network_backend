const { User, Thought } = require("../models");

module.exports = {
  // post request to create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json({ user, message: "User added successfully" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // get request to get all users

  async getUsers(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({ message: "no users found" });
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a singel user based on its id

  async getUserById(req, res) {
    try {
      const user = await User.findById({ _id: req.params.id })
        .select("-__v")
        // .populate("friends", "thoughts");
        .populate([
          { path: "friends", select: "-__v" },
          { path: "thoughts", select: "-__v" },
        ]);

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with the associated id" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // update a user base on the Id passed

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username: req.body.username, email: req.body.email },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "No user found with associated id" });
      }

      res.status(200).json({ updatedUser, message: "user updated" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user by its id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ deletedUser, message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
