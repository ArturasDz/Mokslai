import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { Axios } from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;
function LoginForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

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
    <div className="flex items-center justify-center border-1 rounded-xl pb-6 bg-blue-900">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg ">
        <div className="text-blue-800 text-xl text-center">{error}</div>
        <div>
          <label className="block text-md font-medium bg-gradient-to-r
       from-pink-400 to-violet-500 bg-clip-text font-extrabold text-transparent">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full
        border-1 rounded-sm bg-purple-400 border-violet-400 hover:bg-purple-500  "
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium bg-gradient-to-r
       from-pink-400 to-violet-500 bg-clip-text font-extrabold text-transparent">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full border-1 border-violet-400 rounded-sm bg-purple-400 hover:bg-purple-500 "
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border-1 rounded-xl bg-purple-500 hover:bg-purple-600 h-8 "
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
