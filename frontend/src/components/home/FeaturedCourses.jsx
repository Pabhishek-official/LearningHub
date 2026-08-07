import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Home.css";
function FeaturedCourses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetchCourses();
    }, []);
    const fetchCourses = async () => {
        try {
            const res = await axios.get("https://learninghub-backend-ly49.onrender.com/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="featured-courses py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Featured Courses</h2>
                    <p className="text-muted">
                        Start learning with our most popular courses.
                    </p>
                </div>
                <div className="row g-4">
                    {courses.slice(0, 6).map((course) => (
                        <div className="col-lg-4 col-md-6" key={course._id}>
                            <div className="course-card">
                                <img
                                    src={`https://learninghub-backend-ly49.onrender.com/${course.banner}`}
                                    alt={course.courseName}
                                    className="course-image" />
                                <div className="course-body">
                                    <h4>{course.courseName}</h4>
                                    <p>
                                        {course.description
                                            ? course.description.length > 90
                                                ? course.description.substring(0, 90) +
                                                "..." : course.description : "No description available."}
                                    </p>
                                    <Link
                                        to="/courses"
                                        className="btn btn-primary w-100">Explore Course</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default FeaturedCourses;