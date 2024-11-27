import { useState, useEffect } from "react";
import { Link } from "react-router";
export default function Card() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
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
      {data.map((post) => {
        return (
          <div
            key={post.id}
            className="col-lg-4 p-5 text-center border border-black"
          >
            <h2 className="fw-normal fs-2">{post.username}</h2>
            <p className="fs-4">{post.name}</p>
            <button className="btn btn-secondary ">
              <Link
                className="link-light fw-bolder link-underline link-underline-opacity-0"
                to={`/users/${post.id}`}
              >
                View details
              </Link>
            </button>
          </div>
        );
      })}
    </>
  );
}
