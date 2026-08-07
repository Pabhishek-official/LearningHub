import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row gy-4">
                    {/* Logo */}
                    <div className="col-lg-4 col-md-6">
                        <h2 className="footer-logo">
                            <i className="bi bi-mortarboard-fill me-2"></i>
                            <span>LearningHub</span></h2>
                        <p className="footer-text">
                            LearningHub is a modern online learning platform offering quality courses,
                            study notes, and practical learning resources to help students build successful careers in technology.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                            <li><Link to="/notes">Notes</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    {/* Resources */}
                    <div className="col-lg-3 col-md-6">
                        <h5>Resources</h5>
                        <ul className="footer-links">
                            <li>Latest Courses</li>
                            <li>Study Notes</li>
                            <li>Learning Journey</li>
                            <li>FAQ</li>
                            <li>Student Review</li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="col-lg-3 col-md-6">
                        <h5>Contact</h5>
                        <p>
                            <i className="bi bi-envelope-fill me-2"></i>
                            support@learninghub.com</p>
                        <p>
                            <i className="bi bi-telephone-fill me-2"></i>
                            +91 XXXXX XXXXX</p>
                        <p>
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            lucknow, Uttar Pradesh</p>
                    </div>
                    {/* Social Media */}
                    <div className="col-lg-3 col-md-6">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer">
                                <i className="bi bi-github"></i>
                            </a>
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noreferrer">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noreferrer">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a
                                href="https://youtube.com/"
                                target="_blank"
                                rel="noreferrer">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="footer-bottom">
                    <p>2026 LearningHub. All Rights Reserved.</p>
                    <p>Built with using MERN Stack</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;