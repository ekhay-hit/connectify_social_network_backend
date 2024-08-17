const { Schema, model } = require("mangoose");

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
        type: Schema.Type.objectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Type.objectId,
        ref: "User",
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

//initializing User model
const User = model("user", userSchema);

module.exports = User;
