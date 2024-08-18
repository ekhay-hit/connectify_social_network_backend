const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriendToUser,
} = require("../../controllers/userController.js");

// the url /api/user/
//chaining get and post request base on the url
router.route("/").get(getUsers).post(createUser);

//get a user base on the id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// add a friend to a user

router.route("/:id/friends/:friendId").post(addFriendToUser);

module.exports = router;
