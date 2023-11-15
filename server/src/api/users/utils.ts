import { Response } from "express";
import { IUserDocument } from "./types";

/**
 * function aiming to check a user field
 */
export const checkUserFiled = ({ fieldName, fieldValue, res }: { fieldName: string; fieldValue: string | null; res: Response }): Response | void => {
  if (!fieldValue || (typeof fieldValue === "string" && fieldValue.length < 1)) return res.status(400).json({ message: `${fieldName} can NOT be empty!` });
};

/**
 * function that excludes password field before populating resource (user)
 */
export const excludePasswordFromUser = ({ user }: { user: IUserDocument }) => {
  const { password, ...userFields } = user.toJSON();
  return userFields;
};
