"use-client";
import { useParams } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Footer from "./Footer";
export default function EditBook() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/books/${id}`);
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

  const onSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
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
      <form onSubmit={handleSubmit(onSubmit)} className="col-8 mx-auto">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="title"
            {...register("title", {
              minLength: 3,
              maxLength: 100,
            })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            placeholder="author"
            {...register("author", {})}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="category"
            {...register("category", {})}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="price"
            {...register("price", {
              min: 1,
            })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cover" className="form-label">
            Cover
          </label>
          <input
            type="link"
            id="cover"
            placeholder="covers-link"
            {...register("cover", {
              pattern:
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            })}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>

      <Footer />
    </>
  );
}
