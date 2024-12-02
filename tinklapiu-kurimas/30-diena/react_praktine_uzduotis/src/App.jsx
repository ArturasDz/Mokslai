import { useState } from "react";

import Main from "./components/Main";

import Form from "./components/Form";
import "./App.css";
import { Routes, Route } from "react-router";
import EditBook from "./components/EditBook";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="form" element={<Form />} />

        <Route path="/" element={<Main />} />
        <Route path="books/:id" element={<EditBook />} />
      </Routes>
    </>
  );
}
