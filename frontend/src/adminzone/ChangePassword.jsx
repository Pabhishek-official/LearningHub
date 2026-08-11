import React from "react"


function ChangePassword() {
    return (
        <div className="container-fluid min-vh-100 bg-light py-md-5 py-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-md-7 col-lg-5">

                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-3 p-sm-4 p-md-5">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-inline-flex
                                align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px"
                                    }}>
                                    <i className="bi bi-lock-fill fs-3"></i>
                                </div>
                                <h2 className="text-center text-primary mb-4">
                                    Change Password
                                </h2>
                                <p className="text-muted mb-0">
                                    Update your admin account password
                                </p>
                            </div>
                            {/* New Password */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    New Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter New Password"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">
                                    Confirm Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <i className="bi bi-shield-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                            {/* Button */}
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-pill"
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Change Password
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChangePassword