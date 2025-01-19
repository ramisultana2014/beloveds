import { body, validationResult, param } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
  // we return [] because withValidationErrors have tow middleware first one is validateValues and second one is (req, res, next) , and in express thats the way to let tow middleware work together is to put them inside [] when we want return them
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // here we look at the req and check for the logic in  validateValues,  validateValues is  an array contain
      //[ body("name")
      //         .notEmpty()
      //         .withMessage("name is required")
      //         .isLength({ min: 10 })
      //         .withMessage("name must be at least 10 character"),]
      //validationResult(req) have many methods one of them isEmpty(), which mean if there is errors it will gave us false , if there is no errors it gave us true
      //console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // BadRequestError =400  is good for signup and login  for missing or wrong credintal like email , password ....
        throw new BadRequestError(errorMessages);

        //errors in sample form be like
        //         // type: 'field',
        //         // value: '',
        //         // msg: 'name is required',
        //         // path: 'name',
        //         // location: 'body'

        // BadRequestError,NotFoundError .... instead of return res.status(400/401 ...).json, will create error catch by express-async-errors in server.js and send it down to app.use((err, req, res, next)
      }
      next();
    },
  ];
};
//important notice : inside custom the BadRequestError and NotFoundError purpose is just to create error with the message provided (which is what we want the message) , the actual error that will catch by express-async-errors coming from  (!errors.isEmpty()){ throw new} inside withValidationErrors, so we can just write throw new Error like in validateRegisterInput
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("birthday").notEmpty().withMessage("birthday is required"),
  body("gender").notEmpty().withMessage("gender is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
]);
export const validateForgetPassword = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("please register first");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
]);
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
