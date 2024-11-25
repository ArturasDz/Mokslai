import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch("http://localhost:8080/animals", {
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
    <form onSubmit={handleSubmit(onSubmit)} className="col-4 mx-auto">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: true,
            pattern: /^[A-Z][a-z]/,
          })}
          className="form-control"
        />
        {errors.name?.type === "required" && <p>Name field cannot be empty</p>}
        {errors.name?.type === "pattern" && (
          <p>Name must start with an uppercase letter</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          id="type"
          {...register("type", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
          className="form-control"
        />
        {errors.type?.type === "required" && <p>Type field cannot be empty</p>}
        {errors.type?.type === "minLength" && (
          <p>Type must be atleast 2 characters long</p>
        )}
        {errors.type?.type === "maxLength" && (
          <p>Type can be at most 50 characters long </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="breed" className="form-label">
          Breed
        </label>
        <input
          type="text"
          id="breed"
          {...register("breed", {
            required: true,
            minLength: 5,
            maxLength: 100,
            pattern: /^[A-Z][a-z]/,
          })}
          className="form-control"
        />
        {errors.breed?.type === "required" && (
          <p>Breed field cannot be empty</p>
        )}
        {errors.breed?.type === "pattern" && (
          <p>Breed must start with an uppercase letter</p>
        )}
        {errors.breed?.type === "minLength" && (
          <p>Breed must be atleast 5 characters long</p>
        )}
        {errors.breed?.type === "maxLength" && (
          <p>Breed can be at most 100 characters long </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register("age", { required: true, min: 1, max: 100 })}
          className="form-control"
        />
        {errors.age?.type === "required" && <p>Age field cannot be empty</p>}
        {errors.age?.type === "min" && <p>Age should be atleast 1</p>}
        {errors.age?.type === "max" && <p>Age shouldn't higher than 100</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="weight" className="form-label">
          Weight
        </label>
        <input
          type="number"
          id="weight"
          step="0.01"
          {...register("weight", { min: 0.05 })}
          className="form-control"
        />
        {errors.weight?.type === "min" && <p>minimum weight is 0.05</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          {...register("gender", { required: true })}
          className="form-control"
        />
        {errors.gender?.type === "required" && (
          <p>Gender field cannot be empty</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
