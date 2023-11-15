import mongoose from "mongoose";
import { IUserDocument } from "./types";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your family name"],
  },
  email: {
    type: String,
    // validate: userEmailValidator, TODO:
    required: [true, "Please provide a correct email"],
  },
  password: {
    type: String,
    // password is not required as we use Google OAuth
    required: false,
  },
});

userSchema.index({ email: 1 });

// Virtual method
userSchema.virtual("fullName").get(function (this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

// creation of the model based on the schema:
export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
