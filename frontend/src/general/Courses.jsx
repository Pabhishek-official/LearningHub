import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Courses.css";
import AOS from "aos";
import "aos/dist/aos.css";


function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
        fetchCourses();
    }, []);
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/courses");
            setCourses(response.data.courses);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    //spinner
    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}>
                <div className="spinner-border text-primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    //Final normal return
    return (
        <div className="container py-5">
            {/* Page Title */}
            <section className="courses-header text-center mb-5">
                <div className="courses-icon">
                    <i className="bi bi-journal-bookmark-fill"></i>
                </div>
                <h1 className="fw-bold mt-3">Explore Our Courses</h1>
                <p className="text-muted mt-3 mx-auto"
                    style={{ maxWidth: "700px" }}>
                    Learn web development, programming, databases, and modern technologies through
                    professionally designed courses that help you build real-world skills and advance your career.
                </p>
            </section>
            <div className="search-box mb-5">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search your favourite course..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Statistics course */}
            <div className="row text-center g-4 mb-5">
                <div className="col-lg-3 col-md-6">
                    <div className="course-stat-card">
                        <i className="bi bi-journal-bookmark-fill stat-icon text-primary"></i>
                        <h3>{courses.length}+</h3>
                        <p>Total Courses</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="course-stat-card">
                        <i className="bi bi-people-fill stat-icon text-success"></i>
                        <h3>5K+</h3>
                        <p>Students</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="course-stat-card">
                        <i className="bi bi-award-fill stat-icon text-warning"></i>
                        <h3>20+</h3>
                        <p>Certificates</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="course-stat-card">
                        <i className="bi bi-star-fill stat-icon text-danger"></i>
                        <h3>4.9</h3>
                        <p>Rating</p>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {courses.filter((course) => course.courseName.toLowerCase().includes(search.toLowerCase()
                )
                ).length === 0 ?
                    (<div className="text-center py-5">
                        <i className="bi bi-search fs-1 text-secondary"></i>
                        <h3 className="mt-3">No Courses Found</h3>
                        <p className="text-muted">Try searching with another keyword.</p>
                    </div>
                    ) : (
                        courses.filter((course) => course.courseName.toLowerCase().includes(search.toLowerCase())).map((course) => (
                            <div className="col-lg-4 col-md-6" key={course._id} data-aos="fade-up">
                                <div className="card shadow h-100 course-card">
                                    <img
                                        src={`http://localhost:5000/${course.banner}`}
                                        className="card-img-top"
                                        alt={course.courseName} />
                                    <div className="card-body">
                                        <span className="badge bg-primary mb-3">Featured</span>
                                        <h4>{course.courseName}</h4>
                                        <p>
                                            {course.description.length > 100 ?
                                            course.description.substring(0,100) + "..."
                                        : course.description}
                                        </p>
                                        <div className="d-flex justify-content-between small text-muted mb-3">
                                            <span>
                                                <i className="bi bi-clock-fill me-1"></i>
                                                Self-paced
                                            </span>
                                            <span>
                                                <i className="bi bi-bar-chart-fill me-1"></i>
                                                Beginner
                                            </span>
                                        </div>
                                        <button className="btn btn-primary w-100">
                                            <i className="bi bi-play-circle-fill me-2"></i>
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))}
            </div>
        </div>
    )
}

export default Courses