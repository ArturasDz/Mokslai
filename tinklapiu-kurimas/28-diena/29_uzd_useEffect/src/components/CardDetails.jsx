import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
export default function cardDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
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
      <div>
        <h2>{data.username}</h2>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <button className="btn btn-secondary">
          <Link
            className="link-info fw-bolder link-underline link-underline-opacity-0"
            to="/"
          >
            Go back
          </Link>
        </button>
      </div>
    </>
  );
}
