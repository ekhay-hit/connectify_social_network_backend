const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} = require("../../controllers/userController.js");

// the url /api/user/
//chaining get and post request base on the url
router.route("/").get(getUsers).post(createUser);

//get a user base on the id
router.route("/:id").get(getUserById).put(updateUser);

module.exports = router;
