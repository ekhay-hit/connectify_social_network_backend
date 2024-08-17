const mongoose = require("mongoose");
// defining reactionSchema to use as a subdocument for thoughts scheam
const reactionSchema = mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => mongoose.type.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => {
        return value.toISOString();
      },
    },
  },
  {
    toJSON: {
      getters: true, // this applies getters when converting to JSON
    },
    toObject: {
      getters: true, // this Applies getters when converting to plain objects
    },
  }
);
const thoughtschema = mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "must be at least one characters log"],
      maxlength: [280, "connot exceed 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => {
        return value.toISOString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
      getters: true, // for convering to JSON
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = mongoose.model("thought", thoughtschema);

thoughtschema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

module.exports = Thought;
