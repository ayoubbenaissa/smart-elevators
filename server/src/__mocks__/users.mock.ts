import { User } from "../api/users/types";

export const USER_MISSING_NAME: User = {
  firstName: "",
  lastName: "user",
  email: "user@email.com",
  password: "user pass",
};

export const USER_MISSING_PASS: User = {
  firstName: "demo",
  lastName: "user",
  email: "user@email.com",
  password: "",
};

export const VALID_USER: User = {
    firstName: "demo",
    lastName: "user",
    email: "user@email.com",
    password: "abcABC1!",
  };