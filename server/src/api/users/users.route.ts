import express from "express";
import { signinController, signupController } from "./users.controller";
import { validateSigninMiddleware, validateSignupMiddleware } from "../../middleware/userValidation";

const usersRouter = express.Router();

usersRouter.post("/signin", validateSigninMiddleware, signinController);
usersRouter.post("/signup", validateSignupMiddleware, signupController);

export {usersRouter};