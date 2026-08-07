import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="custom-navbar">

            <div className="nav-container">

                {/* Logo */}

                <NavLink to="/" className="brand-logo">
                    <i className="bi bi-mortarboard-fill"></i>
                    <span>LearningHub</span>
                </NavLink>

                {/* Desktop Menu */}

                <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

                    <li>
                        <NavLink to="/"
                        onClick={() => setMenuOpen(false)}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/courses"
                        onClick={() => setMenuOpen(false)}>Courses</NavLink>
                    </li>

                    <li>
                        <NavLink to="/notes"
                        onClick={() => setMenuOpen(false)}>Notes</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about"
                        onClick={() => setMenuOpen(false)}>About</NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact"
                        onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    </li>

                    <li>
                        <NavLink to="/login"
                        onClick={() => setMenuOpen(false)}>Login</NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/register"
                            className="register-btn"
                            onClick={() => setMenuOpen(false)}
                        >
                            Register
                        </NavLink>
                    </li>

                </ul>

                {/* Mobile Icon */}

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="bi bi-list"></i>
                </button>

            </div>

        </nav>
    );
}

export default Navbar;