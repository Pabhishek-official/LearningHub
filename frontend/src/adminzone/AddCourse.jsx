import React, { useState } from "react";
import "./../css/AddCourse.css";
import { addCourse } from "../services/courseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        banner: null,
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({
            ...formData,
            banner: file,
        });

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.courseName ||
            !formData.description ||
            !formData.banner
        ) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            const data = new FormData();
            data.append("courseName", formData.courseName);
            data.append("description", formData.description);
            data.append("banner", formData.banner);

            const response = await addCourse(data);
            toast.success(response.data.message);
            setFormData({
                courseName: "",
                description: "",
                banner: null,
            });
            setPreview(null);
            document.getElementById("banner").value = "";

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Course upload failed"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="addcourse-page">
            <ToastContainer position="top-right" />
            <div className="addcourse-card">
                {/* Header */}
                <div className="addcourse-header text-center">
                    <div className="addcourse-icon">
                        <i className="bi bi-journal-plus"></i>
                    </div>
                    <h2>Add Course</h2>
                    <p>Create and publish a new Course</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Course Name */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">
                            <i className="bi bi-book me-2 text-primary"></i>
                            Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter course name"
                        />
                    </div>
                    {/* Course Banner */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">
                            <i className="bi bi-image me-2 text-primary"></i>
                            Course Banner</label>
                        <input
                            id="banner"
                            type="file"
                            className="form-control"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/* Image Preview */}
                    <div className="preview-box">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Course banner preview"
                            />
                        ) : (
                            <div className="preview-placeholder">
                                <i className="bi bi-image"></i>
                            <span>Banner Preview will appear here</span>
                            </div>
                        )}
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label
                            className="form-label fw-bold">
                                <i className="bi bi-text-paragraph me-2 text-primary"></i>
                                Course Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="form-control"
                            placeholder="Enter course description..."
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary btn-course"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Uploading...
                                </>) : (
                                    <>
                                    <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                                    Add Course
                                    </>
                                )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default AddCourse;