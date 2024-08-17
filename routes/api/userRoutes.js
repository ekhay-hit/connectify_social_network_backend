const router = require("express").Router();
const { getUsers, createUser } = require("../../controllers");

//chaining get and post request base on the url
router.route("/").get(getUsers).post(createUser);
