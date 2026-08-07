import React, { useEffect, useState } from "react";
import { getNotes, deleteNotes, updateNotes } from "../services/notesService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../css/NotesMgmt.css";

function NotesMgmt() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNote, setEditingNote] = useState(null);
    const [editForm, setEditForm] = useState({
        topicName: "",
        banner: null,
        pdf: null
    });

    const [editPreview, setEditPreview] = useState(null);
    const [updating, setUpdating] = useState(false);

    const handleEdit = (note) => {
        setEditingNote(note);

        setEditForm({
            topicName: note.topicName,
            banner: null,
            pdf: null
        });

        setEditPreview(`https://learninghub-backend-ly49.onrender.com/${note.banner}`);
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleEditBanner = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setEditForm({
            ...editForm,
            banner: file
        });
        setEditPreview(
            URL.createObjectURL(file)
        );
    };

    const handleEditPdf = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            e.target.value = "";
            return;
        }
        setEditForm({
            ...editForm,
            pdf: file
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editForm.topicName) {
            toast.error("Topic name is required");
            return;
        }
        try {
            setUpdating(true);
            const data = new FormData();
            data.append(
                "topicName",
                editForm.topicName
            );
            //Only send banner if user selected a new one
            if (editForm.banner) {
                data.append(
                    "banner",
                    editForm.banner
                );
            }
            //Only send pdf if user selected new one
            if (editForm.pdf) {
                data.append(
                    "pdf",
                    editForm.pdf
                );
            }
            const response = await updateNotes(
                editingNote._id,
                data
            );
            toast.success(response.data.message);
            await fetchNotes();

            setEditingNote(null);
            setEditPreview(null);
        } catch (error) {
            console.log("UPDATE NOTES ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to update notes");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete these notes?");
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteNotes(id);
            toast.success("Notes deleted successfully");
            fetchNotes();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete notes");
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            setNotes(response.data.notes);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load notes");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="notesmgmt-page">
            <ToastContainer position="top-right" />
            <div className="container">
                <h2 className="mb-5">Notes Management</h2>
                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : notes.length === 0 ? (
                    <h4 className="text-center text-primary">No Notes Availabel</h4>
                ) : (
                    <div className="row">
                        {notes.map((note) => (
                            <div className="col-md-6 col-lg-4 mb-4"
                                key={note._id}
                            >
                                <div
                                    className="card shadow h-100">
                                    <img
                                        src={`https://learninghub-backend-ly49.onrender.com/${note.banner}`}
                                        className="card-img-top"
                                        alt={note.topicName}
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    <div
                                        className="card-body"
                                    >
                                        <h5>{note.topicName}</h5>
                                        <div className="d-flex gap-2 mt-3">
                                            <a
                                                href={`https://learninghub-backend-ly49.onrender.com/${note.pdf}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-success flex-grow-1"
                                            >View PDF</a>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => handleEdit(note)}
                                            >Edit</button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(note._id)}
                                            >Delete</button>
                                        </div>
                                    </div>
                                </div>
                                {editingNote && (
                                    <div
                                        className="modal fade show d-block"
                                        tabIndex="-1"
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.5"
                                        }}
                                    >
                                        <div
                                            className="modal-dialog modal-dialog-centered">
                                            <div
                                                className="modal-content rounded-4"
                                            >
                                                <div
                                                    className="modal-header"
                                                >
                                                    <h5
                                                        className="modal-title">Edit Notes</h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={() => {
                                                            setEditingNote(null);
                                                            setEditPreview(null);
                                                        }}></button>
                                                </div>
                                                <form onSubmit={handleUpdate}>
                                                    <div className="modal-body">
                                                        {/* Topic Name */}
                                                        <div className="mb-3">
                                                            <label
                                                                className="form-label fw-bold">Topic Name</label>
                                                            <input
                                                                type="text"
                                                                name="topicName"
                                                                className="form-control"
                                                                value={editForm.topicName}
                                                                onChange={handleEditChange} />
                                                        </div>
                                                        {/* Banner */}
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Replace Banner</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                                                onChange={handleEditBanner} />
                                                        </div>
                                                        {/* Banner Preview */}
                                                        {editPreview && (
                                                            <div
                                                                className="mb-3">
                                                                <img
                                                                    src={editPreview}
                                                                    alt="Banner preview"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "200px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "12px"
                                                                    }} />
                                                            </div>
                                                        )}
                                                        {/* PDF */}
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Replace PDF</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                accept=".pdf,application/pdf"
                                                                onChange={handleEditPdf}
                                                            />
                                                            {editForm.pdf && (
                                                                <small
                                                                    className="text-success d-block mt-2"
                                                                >
                                                                    New PDF: {""}{editForm.pdf.name}
                                                                </small>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="alert alert-info">Leave the banner of PDF empty to keep the existing file.
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={() => {
                                                                setEditingNote(null);
                                                                setEditPreview(null);
                                                            }}
                                                            disabled={updating}>Cancel</button>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={updating}>
                                                            {updating ? (
                                                                <>
                                                                    <span
                                                                        className="spinner-border spinner-border-sm me-2"></span>
                                                                    Updating...
                                                                </>
                                                            ) : ("Save Changes")}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}

export default NotesMgmt;