import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1 className="header-title">Page title</h1>
      <img
        src="public/black-cat.jpg"
        alt="Black cat"
        className="header-img w-100 object-fit-cover"
      />
    </header>
  );
}
