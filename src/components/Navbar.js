import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Beach Resort" />
            </Link>
            <button
              className="navbar-toggler ml-auto"
              type="button"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={`collapse navbar-collapse text-center ${
              menuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav ml-auto">
              {" "}
              {/* Change mx-auto to ml-auto */}
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/room">
                  Room
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
