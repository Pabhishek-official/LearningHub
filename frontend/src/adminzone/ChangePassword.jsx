import React from "react"


function ChangePassword() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">

                            <h2 className="text-center text-primary mb-4">
                                Change Password
                            </h2>

                            {/* New Password */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter New Password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-pill"
                                >
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