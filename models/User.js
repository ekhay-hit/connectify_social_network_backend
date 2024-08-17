const { Schema, model } = require("mongoose");
const Thought = require("./Thought.js");

// schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

// hook that remove the associated thought before removing any user
userSchema.pre("remove", async function (next) {
  const user = this;

  await Thought.deleteMany({ user: user._id });

  next();
});

//initializing User model
const User = model("user", userSchema);

module.exports = User;
