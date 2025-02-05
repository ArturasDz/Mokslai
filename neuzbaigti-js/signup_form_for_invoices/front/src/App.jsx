import { useEffect, useState } from "react";
import LoginFormm from "./components/LoginFormm";
import SignupForm from "./components/SignupForm";
import InvoiceList from "./components/InvoiceList";
import {Route, Routes} from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import ThemeContext from "./ThemeContext";
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginFormm />} />
        <Route path="/invoices" element={<InvoiceList />} />
        </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
