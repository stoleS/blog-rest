const router = require("express-promise-router")();

// Import controller for user route requests
const PostsController = require("../controllers/posts");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/validationHelpers");

// All posts requests
router
  // Access route
  .route("/")
  // Get all posts
  .get(PostsController.index)
  .post(validateBody(schemas.postPostSchema), PostsController.newPost);

router
  .route("/:postId")
  .get(validateParam(schemas.idSchema, "postId"), PostsController.getPost)
  .delete(
    validateParam(schemas.idSchema, "postId"),
    PostsController.deletePost
  );

module.exports = router;
