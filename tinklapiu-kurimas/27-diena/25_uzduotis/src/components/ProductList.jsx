import { Link } from "react-router";

export default function ProductList() {
  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];
  const productsName = products.map((product) => (
    <>
      <li>
        {product.name} <Link to={`/products/${product.id}`}> View Details</Link>
      </li>
    </>
  ));

  return (
    <>
      <h1>Product List</h1>
      <ul>{productsName}</ul>;
    </>
  );
}
