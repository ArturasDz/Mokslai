import { CalorieForm } from "./components/CalorieForm";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CalorieForm />} />
    </Routes>
  );
}

export default App;
