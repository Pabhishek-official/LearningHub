import React, { useState } from "react";
import "./../css/AddNotes.css";
import { addNotes } from "../services/notesService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNotes() {
    const [formData, setFormData] = useState({
        topicName: "",
        banner: null,
        pdf: null
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({
            ...formData,
            banner: file
        });

        setPreview(
            URL.createObjectURL(file)
        );
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Only pdf files are allowed");
            e.target.value = "";
            return;
        }

        setFormData({
            ...formData,
            pdf: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.topicName ||
            !formData.banner ||
            !formData.pdf
        ) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append(
                "topicName",
                formData.topicName
            );

            data.append(
                "banner",
                formData.banner
            );

            data.append(
                "pdf",
                formData.pdf
            );

            const response = await addNotes(data);
            toast.success(response.data.message);

            setFormData({
                topicName: "",
                banner: null,
                pdf: null
            });
            setPreview(null);

            document.getElementById("banner").value = "";
            document.getElementById("pdf").value = "";
        } catch (error) {
            console.log(
                "ADD NOTES ERROR:",
                error
            );
            toast.error(
                error.response?.data?.message || "Notes upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addnotes-page">
            <ToastContainer position="top-right" />
            <div className="addnotes-card">
                <div className="text-center">
                    <h2>Add Notes</h2>
                    <p>Upload and publish study notes</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Topic Name */}
                    <div className="mb-3">
                        <label
                            className="form-label fw-bold"
                        >Topic Name</label>
                        <input
                            type="text"
                            name="topicName"
                            value={formData.topicName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter topic name"
                        />
                    </div>
                    {/* Banner */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Topic Banner</label>
                        <input
                            id="banner"
                            type="file"
                            className="form-control"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handleBannerChange}
                        />
                    </div>
                    {/* Banner Preview */}
                    <div className="notes-preview-box">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Topic banner preview"
                            />
                        ) : (
                            <span>Banner preview will appear here</span>
                        )}
                    </div>
                    {/* PDF */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Attach PDF</label>
                        <input
                            id="pdf"
                            type="file"
                            className="form-control"
                            accept=".pdf,application/pdf"
                            onChange={handlePdfChange}
                        />
                        {formData.pdf && (
                            <small className="text-success d-block mt-2">
                                Selected: {" "}
                                {formData.pdf.name}
                            </small>
                        )}
                    </div>
                    {/* Submit */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg rounded-pill"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Uloading...
                                </>
                            ) : ("Add Notes")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNotes;