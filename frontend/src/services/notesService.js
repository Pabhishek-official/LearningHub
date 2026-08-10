import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/notes`;

//add notes
export const addNotes = (formData) => {
    return axios.post(`${API}/add`, formData);
};

//get notes
export const getNotes = () => {
    return axios.get(API);
};

//Delete notes
export const deleteNotes = (id) => {
    return axios.delete(`${API}/${id}`);
};

export const updateNotes = (id, formData) => {
    return axios.put(`${API}/${id}`, formData);
};