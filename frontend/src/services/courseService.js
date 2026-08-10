import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/courses`;

export const addCourse = (formData) => {
    return axios.post(`${API}/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getCourses = () => {
    return axios.get(API);
};

export const deleteCourse = (id) => {
    return axios.delete(`${API}/${id}`);
};

export const updateCourse = (id, formData) => {
    return axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};