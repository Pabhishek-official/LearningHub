import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ContactMgmt.css";


function ContactMgmt() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;
    const fetchContacts = async () => {
        try{
            setLoading(true);
            const response = await axios.get(`${API}/contacts`);
            setContacts(response.data || []);
        } catch (error) {
            console.log("FETCH CONTACTS ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchContacts();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if(!confirmDelete) return;
        try{
            // Use your delete endpoint here if your backend has one
            await axios.delete(`${API}/contacts/${id}`);
            setContacts((preContacts) =>
                preContacts.filter(
                    (contact) =>
                        contact._id !== id
                )
            );
            toast.success("Contact deleted successfully");
        } catch (error){
            console.log("DELETE CONTACT ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to delete contact");
        }
    };
    const openWhatsApp = (mobile, message) => {
        const phone = String(mobile).replace(/\D/g, "");
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message || "")}`;
        window.open(whatsappUrl, "_blank");
    };
    return (
        <div className="contactmgmt-page">
            <ToastContainer position="top-right" />
            <div className="container py-5">
                {/* Header */}
                <div className="contactmgmt-header">
                    <div>
                        <h2>
                            <i className="bi bi-person-lines-fill me-2"></i>
                            Contact Management
                        </h2>
                        <p>
                            Manage messages and contact requests from users.
                        </p>
                    </div>
                    <div className="contact-count">
                        <i className="bi bi-people-fill me-2"></i>
                        Total Contacts:
                        <strong>{contacts.length}</strong>
                    </div>
                </div>
                {/* Loading */}
                {loading && (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary"
                        role="status"></div>
                        <p className="mt-3">Loading contacts...</p>
                    </div>
                )}
                {/* Empty State */}
                {!loading &&
                contacts.length === 0 && (
                    <div className="empty-contact">
                        <i className="bi bi-person-x"></i>
                        <h4>No Contacts Found</h4>
                        <p>
                            There are no contact message available.
                        </p>
                    </div>
                )}
                {/* Contact Table */}
                {!loading &&
                contacts.length > 0 && (
                    <div className="contact-table-card">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Mobile Number</th>
                                        <th>Email Address</th>
                                        <th>Message</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <div className="contact-name">
                                                    <i className="bi bi-person-circle me-2"></i>
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td>
                                                <i className="bi bi-telephone me-2 text-primary"></i>
                                                {item.mob}
                                            </td>
                                            <td>
                                                <i className="bi bi-envelope me-2 text-primary"></i>
                                                {item.email}
                                            </td>
                                            <td>
                                                <div className="contact-message">
                                                    {item.msg}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-actions">
                                                    <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() =>
                                                        openWhatsApp(
                                                            item.mob,
                                                            item.msg
                                                        )
                                                    }>
                                                        <i className="bi bi-whatsapp me-1"></i>
                                                        WhatsApp
                                                    </button>
                                                    <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }>
                                                        <i className="bi bi-trash3 me-1"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContactMgmt