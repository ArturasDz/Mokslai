import { useState } from "react";
import LoginForm from "./components/loginForm";
function App() {
  return (
    <>
      <h1 className="text-6xl text-center font-mono pb-3 bg-gradient-to-r
       from-pink-400 to-violet-500 bg-clip-text font-extrabold text-transparent ">
        LOGIN
      </h1>
      <LoginForm />
    </>
  );
}

export default App;
