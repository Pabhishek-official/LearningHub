import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Home.css";
function LatestNotes() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetchNotes();
    }, []);
    const fetchNotes = async () => {
        try {
            const res = await axios.get("https://learninghub-backend-ly49.onrender.com/api/notes");
            setNotes(res.data.notes);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="latest-notes py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Latest Study Notes</h2>
                    <p className="text-muted">
                        Download high-quality notes uploaded by our instructors.
                    </p>
                </div>
                <div className="row g-4">
                    {notes.slice(0, 6).map((note) => (
                        <div className="col-lg-4 col-md-6" key={note._id}>
                            <div className="note-card">
                                <img
                                    src={`https://learninghub-backend-ly49.onrender.com/${note.banner}`}
                                    alt={note.topicName}
                                    className="note-image" />
                                <div className="note-body">
                                    <h4>{note.topicName}</h4>
                                    <a
                                        href={`https://learninghub-backend-ly49.onrender.com/${note.pdf}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-success w-100" >
                                        <i className="bi bi-download me-2"></i>
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default LatestNotes;