import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import "../css/Header.css";


function Header() {
    const navigate = useNavigate();
    const { setLoggedIn, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        setLoggedIn(false);
        setUser(null);
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg admin-navbar">
            <div className="container-fluid">
                {/* Logo / Brand */}
                <Link to="/dashborard"
                    className="navbar-brand admin-brand">
                    <i className="bi bi-speedometer-2 me-2"></i>
                    AdminZone
                </Link>
                {/* Mobile menu button */}
                <button className="navbar-toggler admin-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                    aria-controls="adminNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navigation */}
                <div className="collapse navbar-collapse"
                    id="adminNavbar">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link to="/dashboard"
                                className="nav-link">
                                <i className="bi bi-house-door me-1"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ContactMgmt"
                                className="nav-link">
                                <i className="bi bi-envelope me-1"></i>
                                Contact Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AddNotes"
                                className="nav-link">
                                <i className="bi bi-file-earmark-plus me-1"></i>
                                Add Notes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/NotesMgmt"
                                className="nav-link">
                                <i className="bi bi-journal-text me-1"></i>
                                Notes Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AddCourse"
                                className="nav-link">
                                <i className="bi bi-plus-circle me-1"></i>
                                Add Course
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/CourseMgmt"
                                className="nav-link">
                                <i className="bi bi-book me-1"></i>
                                Course Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ChangePassword"
                                className="nav-link">
                                <i className="bi bi-key me-1"></i>
                                Change Password
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link logout-btn"
                                onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Header