import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch("http://localhost:3001/tasks", {
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
  // useEffect(() => {
  //   const value = watch("duetodate");
  //   if (value) {
  const validateDate = (value) => {
    const selected = new Date(value);
    const currentDate = new Date();
    return (currentDate - selected) / (1000 * 60 * 60 * 24) > 1;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-8 mx-auto">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 80,
          })}
          className="form-control"
        />
        {errors.name?.type === "required" && <p>Name field cannot be empty</p>}
        {errors.name?.type === "minLength" && (
          <p>Name must have atleast 2 characters</p>
        )}
        {errors.name?.type === "maxLength" && (
          <p>Name cannot have more than 80 characters</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">
          Task
        </label>
        <input
          type="text"
          id="task"
          {...register("task")}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dueto" className="form-label">
          DueTo
        </label>
        <input
          type="date"
          id="dueto"
          {...register("dueto", {
            required: true,
            validate: validateDate,
          })}
          className="form-control"
        />
        {errors.dueto?.type === "required" && (
          <p>Due-Date field cannot be empty</p>
        )}
        {errors.dueto?.type === "validate" && (
          <p>Task cannot cannot have a bigger gap than 1 year</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}
