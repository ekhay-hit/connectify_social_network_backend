const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
} = require("../../controllers/userController.js");

// the url /api/user/
//chaining get and post request base on the url
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById);

module.exports = router;
