import { useState, useEffect } from "react";
import { Link } from "react-router";
export default function Comments() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
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
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {data.map((comment) => {
        return (
          <div>
            <p>postId:{comment.postId}</p>
            <p>id:{comment.id}</p>
            <p>name:{comment.name}</p>
            <p>email:{comment.email}</p>
            <p>body:{comment.body}</p>
          </div>
        );
      })}
    </>
  );
}
