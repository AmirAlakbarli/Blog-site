import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import postAPI from "../api/postAPI";
import { updatePost, addPost } from "../redux/reducers/postReducer";

const NewBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const dispatch = useDispatch();
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getPost() {
      if (id) {
        const response = await new postAPI().getPostById(id);
        setTitle(response.data.title);
        setBody(response.data.body);
      }
    }
    getPost();
  }, [id]);

  // console.log("post", post);
  // console.log("title", title);
  // console.log("body", body);

  async function updatePostHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (id) {
        const response = await new postAPI().updatePost(id, {
          title,
          body,
        });
        if (response.status === 200) {
          dispatch(updatePost(response.data));
        }
      }
    } catch (error) {
      throw new Error("Cannot update post");
    }
  }

  async function createPostHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (!id) {
        const response = await new postAPI().createPost({
          title,
          body,
        });
        if (response.status === 201) {
          dispatch(addPost(response.data));
        }
      }
    } catch (error) {
      throw new Error("Cannot create post");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      updatePostHandler(e);
    } else {
      createPostHandler(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <h1 className="block mb-5 mt-8 text-orange-400 text-xl">
          {id ? "Update Post" : "Create Post"}
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Comment
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows={5}
            placeholder="Write your comment"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewBlog;
