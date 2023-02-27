import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  middleware: [thunkMiddleware],
});
