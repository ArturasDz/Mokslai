import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1>Marketer</h1>
      <img
        src="public/burger-menu.svg"
        alt="list"
        className="burger-list"
      />{" "}
      <p>Menu</p>
    </header>
  );
}

{
  /* <header>
<nav>
  <ul className="nav-links">
    <li>
      <a href="#Home">Home</a>
    </li>
    <li>
      <a href="#About">About</a>
    </li>
    <li>
      <a href="#BestDeals">Best Deals</a>
    </li>
    <li>
      <a href="#Tools">Tools</a>
    </li>
    <li>
      <a href="#Contact">Contact</a>
    </li>
  </ul>
  <div className="hamburger"></div>
</nav>
</header> */
}
