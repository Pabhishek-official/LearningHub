import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
                                    <Link to="/AddCourse" className="nav-link" style={{color: "white"}}>Contact_Mgmt</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/AddNotes" style={{ color: "white" }}>Add Notes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/NotesMgmt" style={{ color: "white" }}>Notes Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/AddCourse" style={{ color: "white" }}>Add Course</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/CourseMgmt" style={{ color: "white" }}>Course Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ChangePassword" style={{ color: "white" }}>Change Password</Link>
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