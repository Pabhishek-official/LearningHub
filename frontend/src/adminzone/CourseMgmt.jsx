import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse, updateCourse } from "../services/courseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../css/CourseMgmt.css";

function CourseMgmt() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCourse, setEditingCourse] = useState(null);

    const [editForm, setEditForm] = useState({
        courseName: "",
        description: "",
        banner: null
    });

    const [editPreview, setEditPreview] = useState(null);
    const [updating, setUpdating] = useState(false);

    const handleEdit = (course) => {
        setEditingCourse(course);

        setEditForm({
            courseName: course.courseName,
            description: course.description,
            banner: null
        });

        setEditPreview(course.banner);
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editForm.courseName || !editForm.description) {
            toast.error("Course name and description are required");
            return;
        }
        try {
            setUpdating(true);
            const data = new FormData();
            data.append(
                "courseName",
                editForm.courseName
            );
            data.append(
                "description",
                editForm.description
            );
            if (editForm.banner) {
                data.append(
                    "banner",
                    editForm.banner
                );
            }
            const response = await updateCourse(
                editingCourse._id,
                data
            );
            toast.success(response.data.message);
            //refresh courses
            await fetchCourses();
            // Close model
            setEditingCourse(null);
            setEditPreview(null);
        } catch (error) {
            console.log("UPDATE COURSE ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to update course");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await deleteCourse(id);
            toast.success(response.data.message);
            //Remove deleted course immediately from screen
            setCourses((prevCourses) =>
                prevCourses.filter((course) =>
                    course._id !== id)
            );
        } catch (error) {
            console.log("DELETE COURSE ERROR:", error);
            toast.error(
                error.response?.data?.message || "Failed to delete course"
            );
        }

    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await getCourses();
            setCourses(response.data.courses || []);
        } catch (error) {
            console.log("FETCH COURSES ERROR:", error);
            toast.error(
                error.response?.data?.message || "Failed to load courses"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className="coursemgmt-page">
            <ToastContainer position="top-right" />
            <div className="container py-4">
                {/* Header */}
                <div className="coursemgmt-header">
                    <div>
                        <h2>
                            <i className="bi bi-mortarboard-fill me-2"></i>
                            Course Management</h2>
                        <p>Manage all courses from all admin panel.</p>
                    </div>
                    <div className="course-count">
                        <i className="bi bi-book me-2"></i>
                        Total Courses:
                        <strong>{courses.length}</strong>
                    </div>
                </div>
                {/* Loading */}
                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-3">Loading courses...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && courses.length === 0 && (
                    <div className="empty-course">
                        <i className="bi bi-journal-x"></i>
                        <h4>No Courses Found</h4>
                        <p>You haven't added courses yet.</p>
                    </div>
                )}
                {/* Course Cards */}
                {!loading && courses.length > 0 && (
                    <div className="row g-4">
                        {courses.map((course) => (
                            <div className="col-md-6 col-lg-4" key={course._id}>
                                <div className="course-card">
                                    {/* Banner */}
                                    <div className="course-image">
                                        <img
                                            src={course.banner}
                                            alt={course.courseName}
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="course-content">
                                        <h4>{course.courseName}</h4>
                                        <p>{course.description}</p>
                                        {/* Button */}
                                        <div className="course-actions">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={() => handleEdit(course)}>
                                                <i className="bi bi-pencil-square me-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => handleDelete(course._id)}>
                                                <i className="bi bi-trash3 me-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Edit Modal */}
            {editingCourse && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                >
                    <div className="modal-dialog course-edit-dialog">
                        <div className="modal-content course-edit-modal">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h5
                                    className="modal-title">
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Course
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setEditingCourse(null);
                                        setEditPreview(null);
                                    }}
                                ></button>
                            </div>
                            {/* Form */}
                            <form
                                onSubmit={handleUpdate}
                                className="course-edit-form">
                                    {/* modal body */}
                                <div className="modal-body">
                                    {/* Course Name */}
                                    <div className="mb-3">
                                        <label
                                            className="form-label fw-bold"
                                        >Course Name</label>
                                        <input
                                            type="text"
                                            name="courseName"
                                            className="form-control"
                                            value={editForm.courseName}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    {/* Banner */}
                                    <div className="mb-3">
                                        <label
                                            className="form-label fw-bold"
                                        >Course Banner</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            onChange={handleEditBanner}
                                        />
                                    </div>
                                    {/* Preview */}
                                    {editPreview && (
                                        <div className="mb-3">
                                            <img
                                                src={editPreview}
                                                alt="Course preview"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "12px"
                                                }}
                                            />
                                        </div>
                                    )}
                                    {/* Description */}
                                    <div className="mb-3">
                                        <label
                                            className="form-label fw-bold"
                                        >Description</label>
                                        <textarea
                                            name="description"
                                            rows="5"
                                            className="form-control"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                        ></textarea>
                                    </div>
                                </div>
                                {/* modal Footer */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setEditingCourse(null);
                                            setEditPreview(null);
                                        }}
                                        disabled={updating}
                                    >Cancel</button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={updating}
                                    >
                                        {updating ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-lg me-1"></i>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseMgmt;