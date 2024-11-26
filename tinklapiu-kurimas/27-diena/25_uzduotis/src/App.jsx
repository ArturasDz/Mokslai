import ProductList from "./components/ProductList";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetails from "./components/ProductDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
}
