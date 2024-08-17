const router = require("express").Router();
const { getUsers, createUser } = require("../../controllers/userController.js");

// the url /api/user/
//chaining get and post request base on the url
router.route("/").get(getUsers).post(createUser);

module.exports = router;
