import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Notes.css";
function Notes() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);
    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/notes");
            setNotes(response.data.notes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    //Loading spinner
    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}>
                <div className="spinner-border text-primary"
                    style={{ width: "4rem", height: "4rem" }}
                    role="status">
                    <span
                        className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <>
        <div className="container py-5">
            {/* Page Title */}
            <section className="notes-header text-center mb-5">
                <div className="notes-icon">
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                </div>
                <h1 className="fw-bold mt-3">Study Notes</h1>
                <p className="text-muted notes-subtitle"
                    style={{ maxWidth: "700px" }}>
                    Download high-quality study notes prepared to help you understand concepts quickly and perform better in exams and interviews.
                </p>
            </section>
            {/* Search bar */}
            <div className="search-box mb-5">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Statistics */}
            <div className="row text-center g-4 mb-5">
                <div className="col-lg-3 col-md-6">
                    <div className="notes-stat-card">
                        <i className="bi bi-file-earmark-pdf-fill stat-icon text-danger"></i>
                        <h3>{notes.length}+</h3>
                        <p>Total Notes</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="notes-stat-card">
                        <i className="bi bi-download stat-icon text-primary"></i>
                        <h3>10K+</h3>
                        <p>Downloads</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="notes-stat-card">
                        <i className="bi bi-journal-bookmark-fill stat-icon text-success"></i>
                        <h3>20+</h3>
                        <p>Subjects</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="notes-stat-card">
                        <i className="bi bi-star-fill stat-icon text-warning"></i>
                        <h3>4.9</h3>
                        <p>Student Rating</p>
                    </div>
                </div>
            </div>

            {/* Notes Cards */}
            <div className="row g-4">
                {notes.filter((note) => note.topicName.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <i className="bi bi-search fs-1 text-secondary"></i>
                        <h3 className="mt-3">No Notes Found</h3>
                        <p className="text-muted">Try another keyword.</p>
                    </div>
                ) : (notes.filter((note) => note.topicName.toLowerCase().includes(search.toLowerCase()))
                ).map((note) => (
                    <div className="col-md-4" key={note._id}>
                        <div className="card note-card h-100 position-relative">
                            <span className="badge bg-danger position-absolute m-3">Popular</span>
                            <img
                                src={`http://localhost:5000/${note.banner}`}
                                className="card-img-top note-image"
                                alt={note.topicName}
                                style={{
                                    height: "220px",
                                    objectFit: "cover"
                                }} />
                            <div className="card-body">
                                <h4 className="card-title">{note.topicName}</h4>
                                <div className="d-flex justify-content-between text-muted small mb-3">
                                    <span>
                                        <i className="bi bi-filetype-pdf text-danger me-1"></i>
                                        PDF
                                    </span>
                                    <span>
                                        <i className="bi bi-cloud-arrow-down me-1 text-primary"></i>
                                        Free
                                    </span>
                                    <span>
                                        <i className="bi bi-clock-history me-1 text-success"></i>
                                        Updated
                                    </span>
                                </div>
                                <div className="d-flex gap-2 mt-3">
                                    <a
                                        href={`http://localhost:5000/${note.pdf}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-primary flex-fill">
                                        <i className="bi bi-eye-fill me-2"></i>
                                        View
                                    </a>
                                    <a
                                        href={`http://localhost:5000/${note.pdf}`}
                                        download
                                        className="btn btn-primary flex-fill">
                                        <i className="bi bi-download me-2"></i>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            
            {/* Why choose our notes */}
            <div className="mt-5">
                <h2 className="text-center mb-4">Why Use Our Notes?</h2>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card why-note-card p-4 h-100">
                            <h4>
                                <i className="bi bi-book-half me-2 text-primary"></i>
                                Easy to Understand</h4>
                            <p>
                                Our notes are written in simple language with practical examples.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card why-note-card p-4 h-100">
                            <h4>
                                <i className="bi bi-pencil-square me-2 text-success"></i>
                                Exam Focused</h4>
                            <p>
                                Covers important topics frequently asked in exams and interviews.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card why-note-card p-4 h-100">
                            <h4>
                                <i className="bi bi-cloud-arrow-down-fill me-2 text-danger"></i>
                                Free Downloads</h4>
                            <p>
                                Download PDF notes anytime and study at your own pace.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Study Tips */}
            <div className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                        Smart Study Tips
                    </h2>
                    <p className="text-muted">
                        Follow these tips to make the most of your study notes.
                    </p>
                </div>
                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card study-tip-card h-100 p-4 text-center">
                            <i className="bi bi-calendar-check fs-1 text-primary"></i>
                            <h5 className="mt-3">Study Daily</h5>
                            <p className="text-muted">
                                Spend at least 30 minutes every day revisiting your notes.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card study-tip-card h-100 p-4 text-center">
                            <i className="bi bi-pencil-square fs-1 text-success"></i>
                            <h5 className="mt-3">Practice Coding</h5>
                            <p className="text-muted">
                                Apply concepts by writing code after reading each topic.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card study-tip-card h-100 p-4 text-center">
                            <i className="bi bi-book-half fs-1 text-danger"></i>
                            <h5 className="mt-3">Revise Weekly</h5>
                            <p className="text-muted">
                                Review previous topics every week to improve retention.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card study-tip-card h-100 p-4 text-center">
                            <i className="bi bi-trophy-fill fs-1 text-warning"></i>
                            <h5 className="mt-3">Stay Consistent</h5>
                            <p className="text-muted">
                                Small daily progress leads to long term success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* CTA */}
            <section className="py-5 notes-cta">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to Learn More?</h2>
                        <p>Explore premium courses and accelerate your learnig journey.</p>
                        <Link to="/courses"
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
export default Notes