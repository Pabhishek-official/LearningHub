import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Home.css";
function Statistics() {
    const [stats, setStats] = useState({
        courses: 0,
        notes: 0,
    });
    useEffect(() => {
        fetchStats();
    }, []);
    const fetchStats = async () => {
        try {
            const [courseRes, noteRes] = await Promise.all([
                axios.get("http://localhost:5000/api/courses"),
                axios.get("http://localhost:5000/api/notes"),
            ]);
            setStats({
                courses: courseRes.data.courses.length,
                notes: noteRes.data.notes.length,
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="statistics-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">LearningHub in Numbers</h2>
                    <p className="text-muted">Our growing learning community</p>
                </div>
                <div className="row text-center g-4">
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i
                                className="bi bi-journal-bookmark-fill stat-icon"></i>
                            <h2>{stats.courses}+</h2>
                            <p>Courses</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i
                                className="bi bi-file-earmark-pdf-fill stat-icon"></i>
                            <h2>{stats.notes}+</h2>
                            <p>Study Notes</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i
                                className="bi bi-people0-fill stat-icon"></i>
                            <h2>5000+</h2>
                            <p>Students</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i
                                className="bi bi-award-fill stat-icon"></i>
                            <h2>25+</h2>
                            <p>Mentors</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Statistics;