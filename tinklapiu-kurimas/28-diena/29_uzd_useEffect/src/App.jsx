import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import Card from "./components/Card";
import CardDetails from "./components/cardDetails";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={<Card />} />
              <Route path="/users/:id" element={<CardDetails />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
