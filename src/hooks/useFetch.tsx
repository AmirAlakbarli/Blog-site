import { useState, useEffect } from "react";
import axios from "axios";

interface Blogs {
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const useFetch = (url: string,) => {
  const [data, setData] = useState<Blogs[] | any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, setData, isLoading, error };
};

export default useFetch;
