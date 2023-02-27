import { createAsyncThunk } from "@reduxjs/toolkit";
import postAPI from "../../api/postAPI";

export const getAllPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      const allPosts = await (await new postAPI().getAllPosts()).data.reverse();
      return allPosts;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = (state: any, { payload }: any) => {
  state.loading = true;
  try {
    state.postItems.unshift(payload);
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const updatePost = (state: any, { payload }: any) => {
  state.loading = true;
  try {
    const index = state.postItems.findIndex(
      (post: any) => post.id === payload.id
    );
    state.postItems[index] = payload;
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const deletePost = (state: any, { payload }: any) => {
  state.loading = true;
  try {
    state.postItems = state.postItems.filter(
      (post: any) => post.id !== payload
    );
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const deleteAllPosts = (state: any) => {
  state.loading = true;
  try {
    state.postItems = [];
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};
