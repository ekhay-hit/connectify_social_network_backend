const { User, Thought } = require("../models");
const { findById } = require("../models/User");

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

  // adding a friend to a user

  async addFriendToUser(req, res) {
    try {
      // retrieve the id of the friend that need to be added to the user
      const friendId = req.params.friendId;
      const userId = req.params.id;
      // find the user that we need to add friend to its list
      const findUser = await User.findById(userId);
      // if no user find return respons
      if (!findUser) {
        return res.status(404).json({ message: "user not found" });
      }

      if (findUser.friends.includes(friendId)) {
        return res.status(201).json("User already exist in the friend list");
      }

      // if it is found add it to the array of friends then save the user
      findUser.friends.push(friendId);
      await findUser.save();

      res.status(200).json("Friend has been added successfully ");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // this will remove a friend from a user friends

  async removeFriendFromUser(req, res) {
    // retrieving the parameters
    const userId = req.params.id;
    const friendId = req.params.friendId;

    try {
      const user = await User.findById(userId);

      // if there isn't a user
      if (!user) {
        return res.status(404).json("user not found");
      }

      // check if the friend exist in the user list of friend
      if (user.friends.includes(friendId)) {
        // if it exist remove it
        user.friends.splice(friendId, 1);
        // save the user document
        await user.save();
        // return respond
        res.status(200).json("Friend removed from the list");
      } else {
        // else the friend is not in the list return this response
        res.status(404).json("friend is not in the list of this user");
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};
