import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
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
  return (
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
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
          className="form-control"
        />
        {errors.title?.type === "required" && (
          <p>Title field cannot be empty</p>
        )}
        {errors.name?.type === "minLength" && (
          <p>Title must have atleast 3 characters</p>
        )}
        {errors.name?.type === "maxLength" && (
          <p>Title cannot have more than 100 characters</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          id="author"
          placeholder="author"
          {...register("author", {
            required: true,
          })}
          className="form-control"
        />
        {errors.author?.type === "required" && (
          <p>Author field cannot be empty</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          id="category"
          placeholder="category"
          {...register("category", {
            required: true,
          })}
          className="form-control"
        />
        {errors.category?.type === "required" && (
          <p>Category field cannot be empty</p>
        )}
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
            required: true,
            min: 1,
          })}
          className="form-control"
        />
        {errors.price?.type === "required" && (
          <p>Price field cannot be empty</p>
        )}
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
            required: true,
            pattern:
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
          })}
          className="form-control"
        />
        {errors.cover?.type === "required" && (
          <p>Cover field cannot be empty</p>
        )}
        {errors.cover?.type === "pattern" && <p>Link is not valid</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );
}
