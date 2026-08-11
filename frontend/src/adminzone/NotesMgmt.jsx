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
    const API = import.meta.env.VITE_API_URL;

    const getFileUrl = (filePath) => {
        if (!filePath) return "";

        //Cloudinary URL
        if (filePath.startsWith("http")) {
            return filePath;
        }
        //Old local upload path
        return `${API.replace("/api", "")}/${filePath}`;
    };

    const handleEdit = (note) => {
        setEditingNote(note);

        setEditForm({
            topicName: note.topicName,
            banner: null,
            pdf: null
        });

        setEditPreview(getFileUrl(note.banner));
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
            setLoading(true);
            const response = await getNotes();
            setNotes(response.data.notes || []);
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
            <div className="container py-5">
                {/* Header */}
                <div className="notesmgmt-header">
                    <div>
                        <h2>
                            <i className="bi bi-journal-text me-2"></i>
                            Notes Management</h2>
                            <p>
                                Manage all study notes from the admin panel.
                            </p>
                    </div>
                    <div className="notes-count">
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Total Notes:
                        <strong>{notes.length}</strong>
                    </div>
                </div>
                {/* Loading */}
                {loading && (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary"
                        role="status"></div>
                        <p className="mt-3">Loading notes...</p>
                    </div>
                )}
                {!loading && notes.length === 0 && (
                    <div className="empty-notes">
                        <i className="bi bi-journal-x"></i>
                        <h4>No Notes Found</h4>
                        <p>You haven't added any notes yet.</p>
                    </div>
                )}
                {/* Notes Cards */}
                {!loading && notes.length > 0 && (
                    <div className="row g-4">
                        {notes.map((note) => (
                            <div className="col-12 col-md-6 col-lg-4"
                            key={note._id}>
                                <div className="notes-card">
                                    {/* Banner */}
                                    <div className="notes-image">
                                        <img
                                        src={getFileUrl(note.banner)}
                                        alt={note.topicName} />
                                    </div>
                                    {/* Content */}
                                    <div className="notes-content">
                                        <h4>
                                            <i className="bi bi-file-text me-2"></i>
                                            {note.topicName}
                                        </h4>
                                    </div>
                                    {/* Action */}
                                    <div className="notes-actions">
                                        <a
                                        href={getFileUrl(note.pdf)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-success">
                                            <i className="bi bi-file-earmark-pdf me-1"></i>
                                            View PDF
                                        </a>
                                        <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleEdit(note)
                                        }>
                                            <i className="bi bi-pencil-square me-1"></i>
                                            Edit
                                        </button>
                                        <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDelete(note._id)
                                        }>
                                            <i className="bi bi-trash3 me-1"></i>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Edit Modal */}
                {editingNote && (
                    <div className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}>
                         <div
                className="modal-dialog modal-dialog-centered
                modal-dialog-scrollable">
                    <div className="modal-content rounded-4">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Notes
                            </h5>
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
                                {/* Topic */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Topic Name</label>
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
                                {/* Preview */}
                                {editPreview && (
                                    <div className="edit-preview mb-3">
                                        <img
                                        src={editPreview}
                                        alt="Banner preview" />
                                    </div>
                                )}
                                {/* PDF */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Replace PDF</label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    accept=".pdf,application/pdf"
                                    onChange={handleEditPdf} />
                                    {editForm.pdf && (
                                        <small className="text-success d-block mt-2">
                                            <i className="bi bi-file-earmark-pdf me-1"></i>
                                            New PDF:
                                            {" "}
                                            {editForm.pdf.name}
                                        </small>
                                    )}
                                </div>
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Leave the Banner or PDF empty to keep the existing file.
                                </div>
                            </div>
                            {/* Modal Footer */}
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setEditingNote(null);
                                    setEditPreview(null);
                                }}
                                disabled={updating}>
                                    <i className="bi bi-x-lg me-1"></i>
                                    Cancel
                                </button>
                                <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={updating}>
                                    {updating ? (
                                        <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Updating...
                                        </>
                                    ) : (
                                        <>
                                        <i className="bi bi-check-lg me-1"></i>
                                        Save Changes
                                        </>
                                    )
                                }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotesMgmt;