const router = require("express").Router();
const {
  createThought,
  getThoughts,
  getThoughtById,
  updateThought,
} = require("../../controllers/thoughtController.js");

// api now is:  /api/thought
// add a thought base on the user that created it
router.route("/:id").post(createThought).get(getThoughtById).put(updateThought);

router.route("/").get(getThoughts);

module.exports = router;
