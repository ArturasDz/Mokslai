import { CalorieForm } from "./components/CalorieForm";
import { Route, Routes } from "react-router";
import  Card  from "./components/Card";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CalorieForm />} />
      <Route path="/card" element={<Card />} />
    </Routes>
  );
}

export default App;
