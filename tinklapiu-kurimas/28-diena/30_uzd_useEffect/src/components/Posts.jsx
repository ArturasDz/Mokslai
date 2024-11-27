import { useState, useEffect } from "react";
import { Link } from "react-router";
export default function Posts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDataPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDataPosts();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      {data.map((post) => {
        return (
          <div>
            <p>postId:{post.postId}</p>
            <p>id:{post.id}</p>
            <p>name:{post.name}</p>
            <p>email:{post.email}</p>
            <p>body:{post.body}</p>
          </div>
        );
      })}
    </>
  );
}
