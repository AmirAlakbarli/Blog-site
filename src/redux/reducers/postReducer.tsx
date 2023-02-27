import { createSlice } from "@reduxjs/toolkit";
import * as postAction from "../actions/postAction";

const init = {
  loading: false,
  error: null,
  postItems: [],
};

const postReducer = createSlice({
  name: "posts",
  initialState: init,
  extraReducers: (builder) => {
    builder
      .addCase(postAction.getAllPostsAsync.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(
        postAction.getAllPostsAsync.fulfilled,
        (state: any, action: any) => {
          state.loading = false;
          state.postItems = action.payload;
        }
      )
      .addCase(
        postAction.getAllPostsAsync.rejected,
        (state: any, action: any) => {
          state.loading = false;
          state.error =
            action.error.message ?? "An error occurred while fetching posts.";
        }
      );
  },
  reducers: {
    addPost: postAction.addPost,
    updatePost: postAction.updatePost,
    deletePost: postAction.deletePost,
    deleteAllPosts: postAction.deleteAllPosts,
  },
});

export const { addPost, updatePost, deletePost, deleteAllPosts } =
  postReducer.actions;

export default postReducer.reducer;
