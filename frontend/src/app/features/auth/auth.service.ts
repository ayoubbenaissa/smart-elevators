import axios from "axios";
import { LoginPayload, RegisterPayload, UserInfo, UserLoginResponseData } from "./auth.types";
import { getItemWithExpiry, setItemWithExpiry } from "./utils";

const API_URL = "http://localhost:5000/auth/";

// fn handling register logic
const register = async (registerPayload: RegisterPayload) => {
  const response = await axios.post<UserLoginResponseData>(API_URL + "signup", { ...registerPayload });
  if (response.data) {
    const userData: UserInfo = { firstName: response.data.result.firstName, lastName: response.data.result.lastName, id: response.data.result._id };
    // used to persist user data (specially for page reload)
    setItemWithExpiry<UserInfo>({ key: "user", value: userData });
    setItemWithExpiry<string>({ key: "token", value: response.data.token });
  }
  return response.data;
};

const login = async (loginPayload: LoginPayload) => {
  const response = await axios.post<UserLoginResponseData>(API_URL + "signin", { ...loginPayload });
  if (response.data) {
    const userData: UserInfo = { firstName: response.data.result.firstName, lastName: response.data.result.lastName, id: response.data.result._id };
    setItemWithExpiry<UserInfo>({ key: "user", value: userData });
    setItemWithExpiry<string>({ key: "token", value: response.data.token });
  }
  return response.data;
};

const storeGoogleUser = ({ user, token }: { user: UserInfo; token: string }) => {
  setItemWithExpiry<UserInfo>({ key: "user", value: user });
  setItemWithExpiry<string>({ key: "token", value: token });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return getItemWithExpiry<UserInfo>({ key: "user" });
};

const authService = {
  register,
  login,
  storeGoogleUser,
  logout,
  getCurrentUser,
};

export default authService;
