const { User, Thought } = require("../models");

module.exports = {
  // function that will create a post and add it to User array to

  async createThought(req, res) {
    try {
      //   const userId = req.params.userId;
      const createrId = req.params.createrId;

      // find the user that created the thought
      const createrUser = await User.findById(createrId);
      // extract the user name of the user
      const createrUsername = createrUser.username;

      // find the
      //   const findUser = await User.findById(userId);

      // check if the user exist and return a response if not
      if (!createrUser) {
        return res.status(404).json("No user found with request id");
      }

      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: createrUsername,
      });
      // push the thought's id to the array of the user that created it
      const thought_id = thought._id;
      console.log("This is the thought id");
      console.log(thought_id);
      createrUser.thoughts.push(thought_id);
      await createrUser.save();

      res.status(200).json({
        thought,
        message: "Thought created and added to the user array",
      });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // get all the thought

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      if (!thoughts) {
        return res.status(404).json("No thoughts founds");
      }

      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // end of exporting
};
