const router = require("express-promise-router")();

const UserController = require("../controllers/users");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/validationHelpers");

// All user requests
router
  // Access route
  .route("/")
  // Get all posts
  .get(UserController.index)
  // Add a new user
  .post(validateBody(schemas.userPostSchema), UserController.newUser);

// User by ID route requests
router
  // Access route
  .route("/:userId")
  // Get user with provided ID
  .get(validateParam(schemas.idSchema, "userId"), UserController.getUser)
  // Update user
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userPatchSchema)
    ],
    UserController.updateUser
  )
  // Delete user
  .delete(validateParam(schemas.idSchema, "userId"), UserController.deleteUser);

// User categories requests
router
  .route("/:userId/categories")
  // Get user categories
  .get(validateParam(schemas.idSchema, "userId"), UserController.userCategories)
  // Add new category to the user
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userCategoriesPatchSchema)
    ],
    UserController.updateUserCategories
  );

module.exports = router;
