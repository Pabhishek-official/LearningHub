import "./../css/Register.css";
import { useState } from "react";
import { registerUser } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // 1. check all fields are filled
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.mobile ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        // 2. check password match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password do not match");
            setLoading(false);
            return;
        }
        try {
            //send data to backend
            const response = await registerUser({
                fullName: formData.fullName,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
            });
            // show success message
            toast.success(response.data.message);
            // clear the form
            setFormData({
                fullName: "",
                email: "",
                mobile: "",
                password: "",
                confirmPassword: ""
            });
            // redirect after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            // show backend error
            toast.error(error.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-icon">
                    <i className="bi bi-person-plus-fill"></i>
                </div>
                <h2>Create Account</h2>
                <p>Join LearningHub and start your learning journey today.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                        </span>
                        <input onChange={handleChange} name="fullName" value={formData.fullName} type="text" placeholder="Full Name" className="form-control" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input onChange={handleChange} name="email" value={formData.email} type="email" placeholder="Email Address" className="form-control" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-telephone-fill"></i>
                        </span>
                        <input onChange={handleChange} name="mobile" value={formData.mobile} type="tel" placeholder="Mobile Number" className="form-control" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input onChange={handleChange} name="password" value={formData.password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="form-control" />
                        <button
                            type="button"
                            className="btn btn-outline-secondary password-toggle"
                            onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                        </button>
                    </div>
                    <div className="input-group mb-4">
                        <span className="input-group-text">
                            <i className="bi bi-shield-lock-fill"></i>
                        </span>
                        <input
                            onChange={handleChange}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="form-control" />
                        <button
                            type="button"
                            className="btn btn-outline-secondary password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <i className={showConfirmPassword ? "bi bi-eye-shash-fill" : "bi bi-eye-fill"}></i>
                        </button>
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary w-100 register-btn"
                    disabled={loading}>
                        {loading ? (
                            <>
                            <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"></span>
                            Creating Account...
                            </>
                        ) : (
                            <>
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Create Account
                            </>
                        )}
                    </button>
                    <p className="text-center mt-4">
                        Already have an account?
                        <span className="sm-2">
                            <Link to="/login"
                            className="login-link">Login</Link>
                        </span>
                    </p>
                </form>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Register;