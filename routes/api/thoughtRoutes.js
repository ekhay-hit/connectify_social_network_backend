const router = require("express").Router();
const {
  createThought,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController.js");

// api now is:  /api/thought
// thought request base on the user that created it
router
  .route("/:id")
  .post(createThought)
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// ADD REACTION
router.route("/:id/reactions/:thought_id").post(addReaction);

router.route("/").get(getThoughts);

module.exports = router;
