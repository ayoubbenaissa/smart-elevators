import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";

export interface GetUserAuthInfoRequest extends Request {
    userId: string;
};

export interface UserPayload extends JwtPayload {
    id?: string;
    sub?: string; // id that can be used from Google's payload to diff users
}