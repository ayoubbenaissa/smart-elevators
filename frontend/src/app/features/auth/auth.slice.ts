import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RegisterPayload, UserInfo } from "./auth.types";
import authService from "./auth.service";
import { extractUserInfo, getItemWithExpiry } from "./utils";
import { RootState } from "../../store";
import { extractError } from "../common/utils";
import { Error } from "../common/types";

const storedUserInfo = getItemWithExpiry<UserInfo>({ key: "user" });
const storedUserToken = getItemWithExpiry<string>({key: "token"});

const initialState: AuthState = {
  loading: false,
  userInfo: storedUserInfo ? storedUserInfo : null,
  userToken: storedUserToken ? storedUserToken : null,
  success: false,
  error: null,
};

export const register = createAsyncThunk("auth/register", async (user: RegisterPayload, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = extractError(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const login = createAsyncThunk("auth/login", async (user: LoginPayload, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = extractError(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorizeUser: (state: AuthState, { payload: { user, token } }: PayloadAction<{ user: UserInfo; token: string }>) => {
      state.userInfo = { firstName: user.firstName, lastName: user.lastName, id: user.id };
      state.userToken = token;
      authService.storeGoogleUser({ user, token });
    },
    logUserOut: (state: AuthState) => {
      authService.logout();
      state.userInfo = null;
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register thunk
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = extractUserInfo(action.payload?.result);
        state.userToken = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userInfo = null;
        state.error = action.payload as Error;
      })
      // login thunk
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = extractUserInfo(action.payload?.result);
        state.userToken = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userInfo = null;
        state.error = action.payload as Error;
      });
  },
});

export const { authorizeUser, logUserOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
