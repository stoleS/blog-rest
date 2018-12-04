const router = require("express-promise-router")();

const CategoriesController = require("../controllers/categories");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/validationHelpers");

router
  .route("/")
  .get(CategoriesController.index)
  .post(validateBody(schemas.categorySchema), CategoriesController.newCategory);

router
  .route("/:categoryId")
  .get(
    validateParam(schemas.idSchema, "categoryId"),
    CategoriesController.getCategory
  )
  .patch(
    [
      validateParam(schemas.idSchema, "categoryId"),
      validateBody(schemas.updateCategorySchema)
    ],
    CategoriesController.updateCategory
  )
  .delete(
    validateParam(schemas.idSchema, "categoryId"),
    CategoriesController.deleteCategory
  );

module.exports = router;
