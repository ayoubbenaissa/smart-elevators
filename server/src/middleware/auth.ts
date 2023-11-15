import jwt from "jsonwebtoken";
import { GetUserAuthInfoRequest, UserPayload } from "./types";
import { NextFunction, Response } from "express";

export const auth = async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").pop() || "";
    let decodedData: UserPayload;
    // check wheather the token is generated by Google:
    const isGoogleToken = token.length > 500;
    // handle google authorized users:
    if (token && isGoogleToken) {
      decodedData = jwt.decode(token) as UserPayload;
      req.userId = decodedData?.sub;
    }
    // handle authorized user by email:
    else {
      decodedData = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "could not authenticate user. Please try again..." });
  }
};
