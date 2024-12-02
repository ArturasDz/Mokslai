import { useState, useEffect } from "react";
import { Link } from "react-router";
export default function Books() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/books");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [deleteTrigger]);
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/books${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setDeleteTrigger((deleteTrigger) => deleteTrigger + 1);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      {data.map((book) => {
        return (
          <div key={book.id} className="col-lg-4">
            <img
              className="bd-placeholder-img mt-2 rounded"
              width="200"
              height="300"
              src={book.cover}
              alt="books cover"
            />

            <h2 className="fw-normal">{book.title}</h2>
            <p className="m-auto">{book.author}</p>
            <p className="m-auto">{book.category}</p>
            <p className="m-auto">{`${book.price} \u20AC`}</p>
            <button className="btn btn-outline-primary mb-1">
              <Link to={`/books/${book.id}`}>Edit</Link>
            </button>
            <p>
              <button
                className="btn btn-primary"
                onClick={() => deleteBook(`/${book.id}`)}
              >
                Delete
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
}
