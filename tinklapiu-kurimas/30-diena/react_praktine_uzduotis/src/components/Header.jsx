import { NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <nav
        data-bs-theme="dark"
        class="navbar navbar-expand-lg bg-body-tertiary"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            BOOKSTORE
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <NavLink
                    to="/form"
                    className="link-danger link-underline link-underline-opacity-0"
                  >
                    Register your new book
                  </NavLink>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
