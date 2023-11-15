import { Error } from "../common/types";

export interface UserInfo {
  firstName: string;
  lastName: string;
  id?: string;
}

export interface UserLoginResponseData {
  result: {
    firstName: string;
    lastName: string;
    email: string; //not necessary
    _id: string;
  };
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthState = {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  success: boolean;
  error: Error | null;
};

export type RegisterPayload = LoginPayload & UserInfo;
