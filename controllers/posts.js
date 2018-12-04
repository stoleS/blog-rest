const Post = require("../models/post");
const User = require("../models/user");
const { errMsg } = require("../helpers/errorHelpers");

const adminId = "5c052cb1b32f7a01908c00b9";

module.exports = {
  // Get posts
  index: async (req, res, next) => {
    if (req.query.query === "latest") {
      const q = await Post.find({})
        .sort({ date: -1 })
        .limit(3);
      res.status(200).json(q);
    } else {
      const posts = await Post.find({});
      if (posts.length === 0) {
        return res
          .status(200)
          .json({ message: "There are no posts in the database" });
      }
      // Return posts in json format
      res.status(200).json(posts);
    }
  },

  newPost: async (req, res, next) => {
    const newPost = new Post(req.value.body);
    const post = await newPost.save();
    const userId = adminId;
    const user = await User.findById(userId);
    user.posts.push(newPost);
    await user.save();
    res.status(201).json({ message: "Post successfully created.", post: post });
  },

  getPost: async (req, res, next) => {
    const { postId } = req.value.params;
    await Post.findById(postId, (err, post) => {
      if (err || !post) {
        return next(
          errMsg(`Catn't find post with id: ${postId}. Post doesn't exist.`)
        );
      }
      res.status(200).json(post);
    });
  },

  deletePost: async (req, res, next) => {
    const { postId } = req.value.params;
    const userId = adminId;
    const user = await User.findById(userId);
    const post = await Post.findById(postId, (err, post) => {
      if (err || !post) {
        return next(
          errMsg(`Can't delete post with id: ${postId}. Post doesn't exist`)
        );
      }
    });
    await user.posts.pull(post);
    await post.remove();
    await user.save();
    res.status(200).json({ message: "Post has been successfully deleted." });
  }
};
