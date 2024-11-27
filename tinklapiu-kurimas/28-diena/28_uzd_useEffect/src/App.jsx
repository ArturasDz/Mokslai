import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Router } from "react-router";
import Card from "./components/Card";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <Card />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
