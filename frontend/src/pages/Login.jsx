import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../services/authService";
import { saveToken, saveUser } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./../css/Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setLoggedIn, setUser } = useContext(AuthContext);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginUser(formData);
            saveToken(response.data.token);
            saveUser(response.data.user);

            setLoggedIn(true);
            setUser(response.data.user);

            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-icon">
                    <i className="bi bi-person-circle"></i>
                </div>
                <h2>Welcome Back</h2>
                <p>
                    Sign in to continue your LearningHub journey.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="form-control"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="form-control"
                    />
                    <button
                    type="button"
                    className="btn btn-outline-secondary password-toggle"
                    onClick={() => setShowPassword(!showPassword)}>
                        <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                    </button>
                    </div>
                    <div className="d-flex justify-content-between
                    align-items-center mb-4">
                        <div className="form-check">
                            <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe" />
                            <label
                            className="form-check-label"
                            htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <a href="#"
                        className="forgot-link">Forgot Password?</a>
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary w-100 login-btn"
                    disabled={loading}>
                        {loading ? (
                            <>
                            <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"></span>
                            Logging in...
                            </>
                        ) : (
                            <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Login
                            </>
                        )
                    }
                    </button>
                    <p className="text-center mt-4">
                        Don't have an account?
                        <span className="ms-2">
                            <Link to="/register"
                            className="register-link">Register Now</Link>
                        </span>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;