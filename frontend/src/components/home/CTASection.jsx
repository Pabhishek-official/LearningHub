import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";
function CTASection() {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-box">
                    <span className="cta-badge">Start Your Learning Journey Today</span>
                    <h2>Ready to Build Your Future?</h2>
                    <p>
                        Join LearningHub today and access high-quality courses, downloadable study notes,
                        practical Projects, and a structured learning path designed to help you become a confident developer.
                    </p>
                    <div className="cta-buttons">
                        <Link
                            to="/courses"
                            className="btn btn-light btn-lg">Explore Courses</Link>
                        <Link
                            to="/contact"
                            className="btn btn-outline-light btn-lg">Contact Us</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CTASection;