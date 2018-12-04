const Joi = require("joi");
const { errMsg } = require("./errorHelpers");

module.exports = {
  // ID parameter validation
  // We need to provide schema to compare against
  // And the name of the param to be checked
  validateParam: (schema, name) => {
    return (req, res, next) => {
      // Result of the validation
      const result = Joi.validate({ param: req["params"][name], schema });

      if (result.error) {
        return next(errMsg(result.error, 400));
      }

      // We are making a custom request property "value"
      // which is supposed to contain our validated data.
      // It needs to be created in the first pass, but if there
      // are more props we need to append them to the req.value, so
      // to make this "value" property to work with multiple
      // params in the same request we need to check if it
      // already exists which would mean that first param has
      // been added to the said property and there is no need
      // to create it again
      if (!req.value) {
        req.value = {};
      }

      if (!req.value["params"]) {
        req.value["params"] = {};
      }

      req.value["params"][name] = result.value.param;
      next();
    };
  },

  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return next(errMsg(result.error, 400));
      }

      if (!req.value) {
        req.value = {};
      }

      if (!req.value["body"]) {
        req.value["body"] = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    // User schemas
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),

    userPostSchema: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      bio: Joi.string().required(),
      favCategories: Joi.array()
        .items(Joi.string())
        .required()
    }),

    userPatchSchema: Joi.object().keys({
      name: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      bio: Joi.string(),
      favCategories: Joi.array().items(Joi.string()),
      posts: Joi.array().items(Joi.string())
    }),

    userCategoriesPatchSchema: Joi.object().keys({
      favCategories: Joi.array()
        .items(Joi.string())
        .required()
    }),
    // Post schemas
    postPostSchema: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.string().required()
    }),
    // Category schemas
    categorySchema: Joi.object().keys({
      title: Joi.string().required(),
      thumbnail: Joi.string()
        .dataUri()
        .required()
    }),

    updateCategorySchema: Joi.object().keys({
      title: Joi.string(),
      thumbnail: Joi.string()
    })
  }
};
