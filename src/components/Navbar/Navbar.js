import "./Navbar.css";
import { useState } from "react";
import { Hamburger } from "./Hamburger";
import { MenuItems } from "./MenuItems";
import { Search } from "../Search/Search";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [hamburgerStyles, setHamburgerStyles] = useState(
    "hamburger-menu pointer"
  );
  const [menuStyles, setMenuStyles] = useState("menu hide-menu");

  const menuHandler = () => {
    setHamburgerStyles("hamburger-menu pointer");
    setMenuStyles("menu hide-menu");
  };

  return (
    <nav className="navbar">
      <div className="container-center">
        <Hamburger
          hamburgerStyles={hamburgerStyles}
          setHamburgerStyles={setHamburgerStyles}
          setMenuStyles={setMenuStyles}
        />
        <Link to="/" className="container-center brand-logo">
          <p className="brand-name">
            Adda <span>51</span>
          </p>
        </Link>
      </div>

      <Search />
      <div></div>

      <ul className={menuStyles} onClick={menuHandler} id="menu">
        <MenuItems />
      </ul>
    </nav>
  );
};
