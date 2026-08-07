import React from 'react';
import { useState } from "react";
import axios from "axios";
import "../css/Contact.css";
import { Link } from "react-router-dom";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        mob: "",
        email: "",
        msg: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit clicked");

        try {
            const res = await axios.post("https://learninghub-backend-ly49.onrender.com/api/Contact", formData);

            alert(res.data.message);

            setFormData({
                name: "",
                mob: "",
                email: "",
                msg: ""
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <div className="container py-5">
            {/* Hero Section */}
            <section className="contact-header">
                <div className="contact-icon">
                    <i className="bi bi-headset"></i>
                </div>
                <h1>Contact LearningHub</h1>
                <p className="contact-subtitle">
                    Have questions about our courses, study notes, or learning resources?
                    We'd love to hear from you.Our team is here to help.
                </p>
            </section>
            <div className="row">
                {/* Contact Information */}
                <div className="col-md-5">
                    <div className="contact-info-card">
                        <h3 className="mb-4">
                            <i className="bi bi-chat-dots-fill me-2"></i>
                            Get In Touch
                        </h3>
                        <div className="contact-item">
                            <i className="bi bi-geo-alt-fill"></i>
                            <div>
                                <h6>Address</h6>
                                <p>Lucknow, Uttar Pradesh, India</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="bi bi-envelope-fill"></i>
                            <div>
                                <h6>Email</h6>
                                <p>support@learninghub.com</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="bi bi-telephone-fill"></i>
                            <div>
                                <h6>Phone</h6>
                                <p>+91 XXXXX XXXXX</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="bi bi-clock-fill"></i>
                            <div>
                                <h6>Working Hours</h6>
                                <p>Monday - Saturday<br />
                                    9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-md-7">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="mb-4">
                                <i className="bi bi-send-fill me-2"></i>
                                Send Us a Message</h3>

                            <form style={{ textAlign: "left" }} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address :</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">mobile :</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="mob"
                                        placeholder="Enter number :"
                                        required
                                        value={formData.mob}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Message :</label>
                                    <textarea
                                        className="form-control"
                                        name="msg"
                                        rows="5"
                                        placeholder="Write your message..."
                                        required
                                        value={formData.msg}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* FAQ */}
            <section className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-question-circle-fill text-primary"></i>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted">
                        Find quick answers to the questions students ask most often.
                    </p>
                </div>
                <div className="accordion" id="contactFAQ">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq1">
                                How can I enroll in a course?
                            </button>
                        </h2>
                        <div id="faq1"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#contactFAQ">
                            <div className="accordion-body">
                                Browse the courses page and select the course you want to start learning.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq2">
                                Are study notes free?
                            </button>
                        </h2>
                        <div className="faq2"
                        className="accordion collapse collapse"
                        data-bs-parent="#contactFAQ">
                            <div className="accordion-body">
                                Yes. Most study notes are available as free PDF downloads.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq3">
                                How quickly will I receive a reply?
                            </button>
                        </h2>
                        <div id="faq3"
                        className="accordion-collapse collapse"
                        data-bs-parent="#contactFAQ">
                            <div className="accordion-body">
                                We usually respond to all message within 24 hours.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        {/* Contact CTA */}
        <section className="contact-cta">
            <div className="container">
                <div className="cta-box">
                    <h2>
                        Ready to Start Your Learning Journey?
                    </h2>
                    <p>
                        Explore our courses, download study notes, and take the next step toward becoming a
                        skilled developer.
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


export default Contact