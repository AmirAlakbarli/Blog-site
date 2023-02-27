import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/reducers/postReducer";
import postAPI from "../api/postAPI";

interface BlogProps {
  id: number;
  title: string;
  body: string;
}

const Blog = ({ id, title, body }: BlogProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  async function deletePostHandler(id: any) {
    try {
      await new postAPI().deletePost(id);
      dispatch(deletePost(id));
    } catch (error) {
      throw new Error("Error occurred while deleting post");
    }
  }

  return (
    <Link to={`blog/${id}`}>
      <div className="border rounded-md p-4 mt-5">
        <h1 className="text-xl font-medium">{title}</h1>
        <p className="mt-2.5">{body}</p>

        <button
          type="button"
          className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-1 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline"
          onClick={(e) => {
            e.preventDefault();
            navigate(`blog/${id}/edit`);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-1 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          onClick={async (e) => {
            e.preventDefault();
            await deletePostHandler(id);
          }}
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default Blog;
