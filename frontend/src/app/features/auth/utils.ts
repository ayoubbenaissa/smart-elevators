import { UserInfo, UserLoginResponseData } from "./auth.types";

// extracts UserInfo object from payload w.r.t user data
export const extractUserInfo = (payload: UserLoginResponseData["result"]): UserInfo | null => {
  if (payload.firstName && payload.lastName) return { firstName: payload.firstName, lastName: payload.lastName, id: payload._id };
  return null;
};
