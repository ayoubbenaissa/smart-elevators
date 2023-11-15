import { Request } from "express";
import { Document, ObjectId } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserDocument extends User, Document<ObjectId> {
  fullName: string;
};

interface SigninBody {
  email: string;
    password: string;
}


export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface SignupReq extends TypedRequestBody<User> {}

export interface SigninReq extends TypedRequestBody<SigninBody> {}
