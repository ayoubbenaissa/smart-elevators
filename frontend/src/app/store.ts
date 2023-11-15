import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import elevatorsReducer from "./features/elevators/elevators.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    elevators: elevatorsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
