const { User, Thought } = require("../models");
const { findOneAndDelete, findById } = require("../models/User");

module.exports = {
  // function that will create a post and add it to User array to

  async createThought(req, res) {
    try {
      //   const userId = req.params.userId;
      const createrId = req.params.id;

      // find the user that created the thought
      const createrUser = await User.findById(createrId);
      // extract the user name of the user
      const createrUsername = createrUser.username;

      // check if the user exist and return a response if not
      if (!createrUser) {
        return res.status(404).json("No user found with request id");
      }

      // create a thought
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: createrUsername,
      });

      // push the thought's id to the array of the user that created it
      createrUser.thoughts.push(thought._id);
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

  // Get thought by id

  async getThoughtById(req, res) {
    const thought_id = req.params.id;
    try {
      const thought = await Thought.findById(thought_id);

      if (!thought) {
        return res.status(404).json("No thought found with associated id");
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update Thought using its id
  async updateThought(req, res) {
    const thought_id = req.params.id;

    try {
      // update the content base on the id and return the updated version
      const thought = await Thought.findOneAndUpdate(
        { _id: thought_id },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );

      // if no thought found return no found response
      if (!thought) {
        return res.status(404).json("No thought found with the associated id");
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // Delete thought using a thought id
  async deleteThought(req, res) {
    const thought_id = req.params.id;

    try {
      const thought = await Thought.findOneAndDelete(thought_id);
      if (!thought) {
        return res.status(404).json("no thought found with requested id");
      }

      res.status(200).json("Thought has been deleted");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // add reaction to a thoughts reactons array /:id/reactions/:reaction_id

  async addReaction(req, res) {
    //get the id of the user the create the reaction
    const createrId = req.params.id;
    // get the thought where the reaction happened
    const thoughtId = req.params._id;

    try {
      // get the infomation of the creator user
      const createrUser = await User.findById(createrId);
      // get the information for the thought
      const thought = await Thought.findById(thoughtId);

      // if thought does not exists return
      if (!thought) {
        return res.status(404).json("Thought not found");
      }

      // get the username of the creator user
      const createrUsername = createrUser.username;

      // construct the reaction
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: createrUsername,
      };

      console.log("this is the reaction that is being pushed to the array");
      console.log(reaction);

      // push the reaction
      thought.reactions.push(reaction);
      // wait till it is saved
      await thought.save();

      res
        .status(200)
        .json({ thought, message: "reaction has been added to thought" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // function that will delete reaction using post id and reaction id

  async deleteReaction(req, res) {
    const thought_id = req.params.id;
    const reaction_id = req.params._id;
    console.log("This is the thought id");
    console.log(thought_id);
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thought_id },
        { $pull: { reactions: { _id: reaction_id } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json("No thought found with the id");
      }

      res.status(200).json({ thought, message: " reaction deleted" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // end of exporting
};
