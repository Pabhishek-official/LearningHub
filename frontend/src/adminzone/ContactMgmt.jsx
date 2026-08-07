import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function ContactMgmt() {

    const [getContacts, setContacts] = useState([]);
    useEffect(() => {
        axios.get("https://learninghub-backend-ly49.onrender.com/api/contacts")
            .then((res) => {
                setContacts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="container-fluid">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="row">
                <h1 style={{ textAlign: "center" }}>Contact Management</h1>
                <table className="table table-responsive">
                    <thead>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Email Address</th>
                        <th>Message</th>
                        <th colspan="2">Action</th>
                    </thead>
                    <tbody>
                        {
                        getContacts.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.mob}</td>
                                <td>{item.email}</td>
                                <td>{item.msg}</td>
                                <td>
                                    <a href="https://api.whatsapp.com/send?phone=${item.mob}&(encodeURIComponent(item.msg)}"><span className="fa fa-whatsapp" style={{color:"green", fontSize:"30px"}}></span></a>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ContactMgmt