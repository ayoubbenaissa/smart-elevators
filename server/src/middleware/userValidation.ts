import { NextFunction, Response } from "express";
import { SigninReq } from "../api/users/types";
import Joi from "joi";

// schema options
const schemaValidationOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const signinUserValidatorSchema = Joi.object({
  email: Joi.string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      "string.pattern.base": "{{#label}} is not a valid email",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!|?|*|^|%|(|)|-])(?=.{8,})"))
    .messages({
      "string.pattern.base": "{{#label}} is not a valid password (please enter a valid passord [at least 8 length + at least lower and upper and number and special character])",
    })
});

export const validateSigninMiddleware = async (req: SigninReq, res: Response, next: NextFunction) => {
  // validate request body against schema
  const { error, value } = signinUserValidatorSchema.validate(req.body, schemaValidationOptions);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map((x) => x.message).join("; ")}` });
  }
  if (value) {
    return next();
  }
};

const signupUserValidatorSchema = Joi.object({
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(3),
  email: Joi.string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: Joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!|?|*|^|%|(|)|-])(?=.{8,})"))
    .messages({
      "string.pattern.base": "{{#label}} is not a valid password (please enter a valid passord [at least 8 length + at least lower and upper and number and special character])",
    }),
});

export const validateSignupMiddleware = async (req: SigninReq, res: Response, next: NextFunction) => {
  // validate request body against schema
  const { error, value } = signupUserValidatorSchema.validate(req.body, schemaValidationOptions);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map((x) => x.message).join(", ")}` });
  }
  if (value) {
    return next();
  }
};
