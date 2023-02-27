import instance from "./rootAPI";

class commentAPI {
  getAllComments = async () => {
    return await instance.get("/comments");
  };

  getComment = async (id: number) => {
    return await instance.get(`/comments/${id}`);
  };

  addComment = async (comment: any) => {
    return await instance.post("/comments", comment);
  };

  updateComment = async (id: number, comment: any) => {
    return await instance.put(`/comments/${id}`, comment);
  };

  deleteComment = async (id: number) => {
    return await instance.delete(`/comments/${id}`);
  };
}

export default commentAPI;
