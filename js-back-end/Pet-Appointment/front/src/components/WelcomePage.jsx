import { useNavigate } from "react-router"
import Footer from "./Footer";


function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-9xl text-center pb-6 text-violet-600 hover:text-blue-600">
        Welcome
      </h1>
      <p className="text-center text-2xl">
        Please login to proceed. <br /> If you don't have an account, please
        register.<br />
        <button onClick={() => navigate("/signup")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
          Register
        </button>
        <button onClick={() => navigate("/login")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Login
        </button>
      </p>
      <Footer />
    </div>
  );
}

export default WelcomePage;
