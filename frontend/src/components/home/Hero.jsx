import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import heroImage from "../../assets/hero-learning.svg";

function Hero() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6 hero-content">
                        <span className="hero-badge">Learn . Practice . Succeed</span>
                        <h1 className="hero-title">Learn Skills.<br />
                            Build Your Future.</h1>
                        <p className="hero-description">Welcome to<strong> LearningHub</strong>, your one-stop platform for
                            learning programming, web development, MERN Stack, AI, and technology through quality courses and downloadable study notes.</p>
                        <div className="hero-buttons">
                            <Link to="/courses"
                                className="btn btn-primary btn-lg me-3">Explore Courses</Link>
                            <Link to="/notes"
                                className="btn btn-outline-light btn-lg">Download Notes</Link>
                        </div>
                        <div className="hero-stats mt-5">
                            <div>
                                <h3>150+</h3>
                                <p>Courses</p>
                            </div>
                            <div>
                                <h3>5000+</h3>
                                <p>Students</p>
                            </div>
                            <div>
                                <h3>300+</h3>
                                <p>Notes</p>
                            </div>
                            <div>
                                <h3>4.9*</h3>
                                <p>Rating</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Image */}
                    <div className="col-lg-6 text-center">
                        <img
                            src={heroImage}
                            alt="Learning"
                            className="hero-image" />
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Hero;