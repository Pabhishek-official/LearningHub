import axios from "axios";

const API = "https://learninghub-backend-ly49.onrender.com/api/auth";
export const registerUser = (userData) => {
    return axios.post(`${API}/register`, userData);
};

export const loginUser = (userData) => {
    return axios.post(`${API}/login`, userData);
}