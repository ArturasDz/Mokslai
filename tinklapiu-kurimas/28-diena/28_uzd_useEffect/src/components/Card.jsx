import { useState, useEffect } from "react";
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
          <div key={post.id} className="col-lg-4">
            {/* <img
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              src=""
              alt="users profile avatar"
            /> */}

            <h2 className="fw-normal">{post.username}</h2>
            <p>{post.name}</p>
            <button className="btn btn-secondary">View details</button>
          </div>
        );
      })}
    </>
  );
}
