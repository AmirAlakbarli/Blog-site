import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import commentAPI from "../api/commentAPI";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const BlogDetails: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");

  const { data, setData, isLoading } = useFetch(
    `https://blog-api-t6u0.onrender.com/posts/${id}?_embed=comments`
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let postId;
      if (id) {
        postId = parseInt(id);
      } else {
        throw new Error("id is not a number");
      }

      const response = await new commentAPI().addComment({
        postId: postId,
        name: name,
        email: email,
        body: newComment,
      });

      if (response.status === 201) {
        setData({ ...data, comments: [...data.comments, response.data] });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setName("");
    setEmail("");
    setNewComment("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-medium">{data?.title}</h3>
      <p className="mt-2">{data?.body}</p>

      {data?.comments.length > 0 && (
        <ul className="border p-3 mt-3 rounded-md">
          {data.comments.map(({ id, name, email, body }: Comment) => (
            <div key={id} className="border p-3 mt-3 rounded-md">
              <p className="font-medium">{email}</p>
              <p className="font-medium">{name}</p>
              <p>{body}</p>
            </div>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <h1 className="block mb-5 mt-8 text-orange-400 text-xl">
          Write comment
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
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
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

export default BlogDetails;
