import { useState } from "react";
import LoginForm from "./components/loginForm";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Tours from "./components/Tours";
import DashBoard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tours" element={<Tours />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
