import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from 'react-router';


function App() {
  return (
   <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/appointments" element={<AppointmentList />} />
    <Route path="/appointments/new" element={<AppointmentForm />} />
   </Routes>
  );
}

export default App;