import { Link, useParams } from "react-router";

export default function ProductDetails() {
  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];
  const { id } = useParams();
  console.log(id);
  const title = products.find((productsTitle) => (productsTitle = id));
  console.log(title.name);
  return (
    <>
      {id ? (
        <>
          <h1>{title.name}</h1>
          <p>
            <Link to="/">Back to Product List</Link>
          </p>
        </>
      ) : (
        <p>Page product is not present</p>
      )}
    </>
  );
}
