import { body } from "express-validator";
import validationHanler from "../app-utilities/validation-handler";

export const addCategoryValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .escape(),

  validationHanler,
];
