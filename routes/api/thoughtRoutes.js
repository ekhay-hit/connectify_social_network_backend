const router = require("express").Router();
const {
  createThought,
  getThoughts,
} = require("../../controllers/thoughtController.js");

// api now is:  /api/thought
// add a thought base on the user that created it
router.route("/:createrId").post(createThought);

router.route("/").get(getThoughts);

module.exports = router;
