import Home from "./components/Home";
import About from "./components/About";
import "./App.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
