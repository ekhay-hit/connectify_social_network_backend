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
};
