const Category = require("../models/category");
const { errMsg } = require("../helpers/errorHelpers");

module.exports = {
  index: async (req, res, next) => {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no categories in the database." });
    }
    res.status(200).json(categories);
  },

  newCategory: async (req, res, next) => {
    const newCategory = new Category(req.value.body);
    const category = await newCategory.save();
    res.status(201).json({
      message: "Category has been successfully created.",
      category: category
    });
  },

  getCategory: async (req, res, next) => {
    const { categoryId } = req.value.params;
    await Category.findById(categoryId, (err, category) => {
      if (err || !category) {
        return next(errMsg(`Can't find category with id: ${categoryId}`));
      }
      res.status(200).json(category);
    });
  },

  updateCategory: async (req, res, next) => {
    const { categoryId } = req.value.params;
    const update = req.value.body;
    await Category.findByIdAndUpdate(categoryId, update, (err, category) => {
      if (err || !category) {
        return next(errMsg(`Can't update category with id: ${categoryId}`));
      }
      res
        .status(200)
        .json({ message: "Category has been successfully updated." });
    });
  },

  deleteCategory: async (req, res, next) => {
    const { categoryId } = req.value.params;
    await Category.findByIdAndRemove(categoryId, (err, category) => {
      if (err || !category) {
        return next(
          errMsg(
            `Can't delete category with id: ${categoryId}. Category doesn't exist.`
          )
        );
      }
      res
        .status(200)
        .json({ message: "Category has been successfully deleted." });
    });
  }
};
