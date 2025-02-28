import { PersonalForm } from "./components/PersonalForm";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersonalForm />} />
    </Routes>
  );
}

export default App;
