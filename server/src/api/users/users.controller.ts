import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "express";

import { UserModel } from "./users.model";
import { User, SigninReq, SignupReq } from "./types";
import { excludePasswordFromUser } from "./utils";

export const createUser = async ({ firstName, lastName, email, password }: User, res: Response) => {
  try {
    // check user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "user already exists!" });
    const hashedPass = await hash(password, 12);
    const newUserData = { firstName, lastName, email, password: hashedPass };
    const newUser = await UserModel.create(newUserData);
    // sign token and send it back with the user
    const token = sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    const newUserExcludedPass = excludePasswordFromUser({ user: newUser });
    return res.status(201).json({ result: newUserExcludedPass, token });
  } catch (error) {
    return res.status(500).json({ message: "user creation failed..." });
  }
};

export const signupUserWithEmail = (req: SignupReq, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // check data:
    // TODO: maybe refactor common logic?
    if (!firstName || (typeof firstName === "string" && firstName.length < 1)) return res.status(400).json({ message: `user name can NOT be empty!` });
    if (!lastName || (typeof lastName === "string" && lastName.length < 1)) return res.status(400).json({ message: `family name can NOT be empty!` });
    if (!email || (typeof email === "string" && email.length < 1)) return res.status(400).json({ message: `email can NOT be empty!` });
    if (!password || (typeof password === "string" && password.length < 1)) return res.status(400).json({ message: `password can NOT be empty!` });

    return createUser({ firstName, lastName, email, password }, res);
  } catch (error) {
    return res.status(500).json({ message: "user creation failed..." });
  }
};

export const signupController = async (req: SignupReq, res: Response) => {
  try {
    await signupUserWithEmail(req, res);
    // TODO: maybe it is a good idea to also store Google authenticated users?
  } catch (error) {
    console.log(" error ", JSON.stringify(error));
    return res.status(500).json({ message: "user creation failed..." });
  }
};

export const signinController = async (req: SigninReq, res: Response) => {
  // extract user creds:
  const { email, password } = req.body;
  try {
    // check given data is not empty:
    if (!email || (typeof email === "string" && email.length < 1)) return res.status(400).json({ message: `email can NOT be empty!` });
    if (!password || (typeof password === "string" && password.length < 1)) return res.status(400).json({ message: `password can NOT be empty!` });
    // steps: check users exists => check password => return user
    // check users exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "user does NOT exist!" });
    // check password:
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "invalid credentials..." });
    // sign token and send it back with the user
    const token = sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    const existingUserExcludedPass = excludePasswordFromUser({ user: existingUser });
    return res.status(200).json({ result: existingUserExcludedPass, token });
  } catch (error) {
    return res.status(500).json({ message: "signin action failed..." });
  }
};
