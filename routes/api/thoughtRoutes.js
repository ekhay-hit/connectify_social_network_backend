const router = require("express").Router();
const {
  createThought,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
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
router.route("/:id/reactions/:_id").post(addReaction).delete(deleteReaction);

router.route("/").get(getThoughts);

module.exports = router;
