const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
