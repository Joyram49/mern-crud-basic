import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import userReducer from "../api/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
