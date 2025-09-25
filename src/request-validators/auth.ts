import { body } from "express-validator";
import validationHanler from "../app-utilities/validation-handler";
import User from "../database/models/user";

export const registerUserValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .escape(),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .trim()
    .escape()
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already registered");
      }
      return true;
    }),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    )
    .trim()
    .escape(),

  validationHanler,
];

export const loginValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .trim()
    .escape(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .escape(),

  validationHanler,
];

export const refreshTokenValidator = [
  body("refreshToken")
    .exists({ checkFalsy: true })
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Token must be a string")
    .trim()
    .escape(),

  validationHanler,
];
