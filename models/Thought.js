const mongoose = require("mongoose");

const thoughtschema = mangoose.schema(
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
    reactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reaction",
    },
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);
