import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import Blog from "../components/Blog";
import { getAllPostsAsync } from "../redux/actions/postAction";
import {ThunkDispatch} from "@reduxjs/toolkit";

interface Blogs {
  id: number;
  title: string;
  body: string;
}

const Home: React.FC = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const posts = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch])

  if (posts.error) {
    return <div>Error occurred: {posts.error}</div>;
  }

  return (
    <div>
      <Link to="/new-blog" className="p-2 rounded-md bg-green-500 text-white">
        Add new blog
      </Link>

      {posts.loading ? (
        <div>Loading...</div>
      ) : (
        posts.postItems?.map(({ id, title, body }: Blogs) => (
          <Blog key={id} id={id} title={title} body={body} />
        ))
      )}
    </div>
  );
};

export default Home;
