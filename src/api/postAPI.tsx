import instance from "./rootAPI";

class postAPI {
  async getAllPosts() {
    try {
      const allPosts = await instance.get("/posts");
      return allPosts;
    } catch (error) {
      throw new Error("Error while fetching all posts");
    }
  }

  async getPostById(id: string) {
    try {
      const post = await instance.get(`/posts/${id}`);
      return post;
    } catch (error) {
      throw new Error("Error while fetching post");
    }
  }

  async createPost(post: any) {
    try {
      const newPost = await instance.post("/posts", post);
      return newPost;
    } catch (error) {
      throw new Error("Error while creating post");
    }
  }

  async updatePost(id: string, post: any) {
    try {
      const updatedPost = await instance.put(`/posts/${id}`, post);
      return updatedPost;
    } catch (error) {
      throw new Error("Error while updating post");
    }
  }

  async deletePost(id: string) {
    try {
      const deletedPost = await instance.delete(`/posts/${id}`);
      return deletedPost;
    } catch (error) {
      throw new Error("Error while deleting post");
    }
  }

  async deleteAllPosts() {
    try {
      const deletedPosts = await instance.delete("/posts");
      return deletedPosts;
    } catch (error) {
      throw new Error("Error while deleting all posts");
    }
  }
}

export default postAPI;
