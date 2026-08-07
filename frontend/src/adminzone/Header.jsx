import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";


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
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid" style={{ background: "Navy" }}>
                        <a className="navbar-brand" href="#" style={{ color: "white" }}>Admin Zone</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/dashboard" style={{ color: "white" }}>Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/contactmgmt" style={{ color: "white" }}>Contact Management</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/addnotes" style={{ color: "white" }}>Add Notes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/notesmgmt" style={{ color: "white" }}>Notes Management</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/addcourse" style={{ color: "white" }}>Add Course</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/coursemgmt" style={{ color: "white" }}>Course Management</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/changepassword" style={{ color: "white" }}>Change Password</a>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout} style={{
                                        color: "white",
                                        background: "none",
                                        border: "none"
                                    }} >Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header