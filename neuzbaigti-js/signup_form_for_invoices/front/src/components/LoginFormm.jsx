import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { Axios } from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
function LoginForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formdata,
        { withCredentials: true }
      );
      // console.log(response.data);
      setUser(response.data);

      //navigate to main page if login is successful
      navigate("/invoices");

    } catch (error) {
      // axios.isAxiosError(error) is a built-in method in Axios that checks whether the error object comes from an Axios request.
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message ||
              "Something went wrong, please try again."
          );
        } else if (error.request) {
          setError("No response from server, please try again.");
        } else {
          setError("Something went wrong, please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
    <h1 className="text-6xl text-center font-bold mb-8 mt-4 hover:text-blue-600">
        Log In
      </h1>
    <div className="flex items-center justify-center rounded-xl pb-6 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg ">
        <div className="text-red-500 text-xl text-center">{error}</div>
        <div>
          <label className="block text-md font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
    <div>
      <p className="text-center text-xl">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600">
          Sign Up
        </a>
      </p>
    </div>
    </>
  );
}

export default LoginForm;
