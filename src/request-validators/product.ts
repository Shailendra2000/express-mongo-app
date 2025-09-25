import { body, param } from "express-validator";
import Category from "../database/models/category";
import validationHanler from "../app-utilities/validation-handler";

export const createProductValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .escape(),

  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat(),

  body("category")
    .exists({ checkFalsy: true })
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category must be a valid ID")
    .custom(async (value) => {
      const category = await Category.findById(value);
      if (!category) {
        return Promise.reject("Category does not exist");
      }
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .escape(),

  validationHanler,
];

export const updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .escape(),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat(),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .escape(),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be a valid ID")
    .custom(async (value) => {
      const category = await Category.findById(value);
      if (!category) return Promise.reject("Category does not exist");
    }),

  validationHanler,
];

export const deleteProductValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  validationHanler,
];
