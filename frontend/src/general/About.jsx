import React from "react";
import "../css/About.css";
import { Link } from "react-router-dom";

function About() {
    return (
        <>
        <div className="container py-5">
            {/* Hero Section */}
            <section className="about-header">
                <div className="about-icon">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>
                <h1>About LearningHub</h1>
                <p className="about-subtitle">
                    LearningHub is a modern online learning platform dedicated to
                    helping students master programming through high-quality courses, downloadable
                    study notes, and practical learning resources.
                </p>
            </section>
            {/* Mission & Vision */}
            <section className="py-5">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="mission-card">
                            <i className="bi bi-bullseye"></i>
                            <h3>Our Mission</h3>
                            <p>Our mission is to provide accessible, high-quality programming education
                                that enables students to learn modern technologies, improve their
                                practical skills, and achieve their career goals.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mission-card">
                            <i className="bi bi-eye-fill"></i>
                            <h3>Our Vision</h3>
                            <p>
                                Our vision is to become one of the most trusted learning platform for
                                students by offering structured learning paths, practical projects, and
                                industry-relevant educational content.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Choose LearningHub */}
            <section className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-stars text-warning me-2"></i>
                        Why Choose LearningHub?
                    </h2>
                    <p className="text-muted">
                        Everything you need to learn programming in one place.
                    </p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="feature-card">
                            <i className="bi bi-book-fill"></i>
                            <h5>Quality Courses</h5>
                            <p>Industry-focused courses designed for beginners and aspiring developers.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="feature-card">
                            <i className="bi bi-file-earmark-pdf-fill"></i>
                            <h5>Study Notes</h5>
                            <p>Download easy-to-understand notes for revision and exam preparation.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="feature-card">
                            <i className="bi bi-laptop-fill"></i>
                            <h5>Practical Learning</h5>
                            <p>
                                Learn by building projects and applying concepts in real scenarios.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="feature-card">
                            <i className="bi bi-people-fill"></i>
                            <h5>Student Friendly</h5>
                            <p>
                                A simple and organized platform designed for effective learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Technologies */}
            <section className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-code-slash text-primary me-2"></i>
                        Technologies We Cover
                    </h2>
                    <p className="text-muted">
                        Learn modern technologies used in real-world software development.
                    </p>
                </div>
                <div className="tech-stack">
                    <span className="tech-badge">HTML5</span>
                    <span className="tech-badge">CSS3</span>
                    <span className="tech-badge">Bootstrap</span>
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">React</span>
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">Express.js</span>
                    <span className="tech-badge">MongoDB</span>
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">Django</span>
                    <span className="tech-badge">MySQL</span>
                </div>
            </section>
            {/* Learning Journey */}
            <section className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-signpost-split-fill text-success me-2"></i>
                        Your Learning Journey
                    </h2>
                    <p className="text-muted">
                        A simple roadmap to become a confident developer.
                    </p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-person-plus-fill"></i>
                            <h6>Join</h6>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-journal-bookmark-fill"></i>
                            <h6>Choose Course</h6>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-file-earmark-pdf-fill"></i>
                            <h6>Study Notes</h6>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-code-slash"></i>
                            <h6>Practice</h6>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-award-fill"></i>
                            <h6>Build Skills</h6>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="journey-card">
                            <i className="bi bi-briefcase-fill"></i>
                            <h6>Career Ready</h6>
                        </div>
                    </div>
                </div>
            </section>
            {/* Statistics */}
            <section className="py-5">
                <div className="row text-center g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="about-stat-card">
                            <i className="bi bi-journal-bookmark-fill"></i>
                            <h2>50+</h2>
                            <p>Programming Courses</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="about-stat-card">
                            <i className="bi bi-file-earmark-pdf-fill"></i>
                            <h2>250+</h2>
                            <p>Study Notes</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="about-stat-card">
                            <i className="bi bi-people-fill"></i>
                            <h2>10K+</h2>
                            <p>Happy Students</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="about-stat-card">
                            <i className="bi bi-star-fill"></i>
                            <h2>4.9</h2>
                            <p>Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Students Testimonials */}
            <section className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-chat-square-quote-fill text-primary"></i>
                        What Students Say
                    </h2>
                    <p className="text-muted">
                        Here's what our learners say about LearningHub.
                    </p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="testimonial-card">
                            <i className="bi bi-person-circle testimonial-icon"></i>
                            <h5>Rahul Sharma</h5>
                            <p className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </p>
                            <p>
                                The notes are simple, practical, and helped me prepare for my semester exams.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-card">
                            <i className="bi bi-person-circle testimonial-icon"></i>
                            <h5>Priya Singh</h5>
                            <p className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </p>
                            <p>
                                The course are well organized and easy to follow for beginners.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-card">
                            <i className="bi bi-person-circle testimonial-icon"></i>
                            <h5>Amit Verma</h5>
                            <p className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </p>
                            <p>
                                LearningHub made learnig web development much easier through notes and projects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        {/* CTA */}
        <section className="about-cta">
            <div className="container">
                <div className="cta-box">
                    <i className="bi bi-rocket-takeoff-fill display-3"></i>
                    <h2>Start Your Learning Journey Today</h2>
                    <p>
                        Join LearningHub and begin mastering programming with quality courses, downladable notes,
                        and practical projects.
                    </p>
                    <Link
                    to="/courses"
                    className="btn btn-light btn-lg">
                        <i className="bi bi-journal-bookmark-fill me-2"></i>
                        Explore Courses
                    </Link>
                </div>
            </div>
        </section>
        </>
    )
}
export default About