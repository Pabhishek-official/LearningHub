import axios from "axios";

const API = "https://learninghub-backend-ly49.onrender.com/api/notes";

export const addNotes = (formData) => {
    return axios.post(`${API}/add`,
        formData, {
        headers: {
            "Content-Type": "multipart/formData",
        },
    });
};

export const getNotes = () => {
    return axios.get(API);
};

export const deleteNotes = (id) => {
    return axios.delete(`${API}/${id}`);
};

export const updateNotes = (id, formData) => {
    return axios.put(`${API}/${id}`,
        formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};