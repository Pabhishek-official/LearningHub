import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../css/Dashboard.css";


function Dashboard() {
    const navigate = useNavigate();
    const { setLoggedIn, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        setLoggedIn(false);
        setUser(null);
        navigate("/login");
    };
    return (
        <div className="dashboard-page">
            <div className="container-fluid dashboard-container">
                <div className="row g-4 justify-content-center">
                    {/* Dashboard */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <Link to="/dashboard" className="dashboard-card dashboard-orange">
                        <i className="bi bi-house-door-fill"></i>
                        <span>Dashboard</span>
                        </Link>
                    </div>
                    {/* Contact Management */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <Link to="/ContactMgmt" className="dashboard-card dashboard-pink">
                        <i className="bi bi-telephone-fill"></i>
                        <span>Contact Management</span>
                        </Link>
                    </div>
                    {/* Add Notes */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <Link to="/AddNotes" className="dashboard-card dashboard-blue">
                        <i className="bi bi-file-earmark-plus-fill"></i>
                        <span>Add Notes</span>
                        </Link>
                    </div>
                    {/* Add Course */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <Link to="/AddCourse" className="dashboard-card dashboard-green">
                        <i className="bi bi-journal-plus"></i>
                        <span>Add Course</span>
                        </Link>
                    </div>
                    {/* Change Password */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <Link to="/ChangePassword" className="dashboard-card dashboard-teal">
                        <i className="bi bi-key-fill"></i>
                        <span>Change Password</span>
                        </Link>
                    </div>
                    {/* Logout */}
                    <div className="col-12 col-sm-6 col-lg-4">
                        <button type="button" className="dashboard-card dashboard-purple dashboard-logout"
                        onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;