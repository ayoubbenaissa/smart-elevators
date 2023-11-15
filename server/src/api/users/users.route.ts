import express from "express";
import { signinController, signupController } from "./users.controller";

const usersRouter = express.Router();

usersRouter.post("/signin", signinController);
usersRouter.post("/signup", signupController);

export {usersRouter};