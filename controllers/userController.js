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
      const user = await User.findById(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with the associated id" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
