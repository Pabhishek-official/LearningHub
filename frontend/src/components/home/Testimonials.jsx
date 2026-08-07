import React from "react";
import "../../css/Home.css";
const testimonials = [
    {
        name: "Rahul Sharma",
        course: "MERN Stack Student",
        image: "https://i.pravatar.cc/150?img=11",
        review: "LearningHub helped me understand MERN Stack with practical projects. The notes and courses are excellent."
    },
    {
        name: "Priya Singh",
        course: "Frontend Developer",
        image: "https://i.pravatar.cc/150?img=5",
        review: "The study notes are well organized and very easy to understand. I improved my web development skills quickly."
    },
    {
        name: "Aman Verma",
        course: "React Student",
        image: "https://i.pravatar.cc/150?img=15",
        review: "The interface is simple, responsive, and the learning roadmap keeps me motivated throughout the course."
    }
];
function Testimonials() {
    return (
        <section className="testimonial-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">What Our Student Say</h2>
                    <p className="text-muted">
                        Trusted by students learning programming and web development.
                    </p>
                </div>
                <div className="row g-4">
                    {testimonials.map((item, index) => (
                        <div className="col-lg-4" key={index}>
                            <div className="testimonial-card">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="testimonial-image" />
                                <h5>{item.name}</h5>
                                <small>{item.course}</small>
                                <p className="mt-3">"{item.review}"</p>
                                <div className="text-warning fs-5">
                                    *****
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Testimonials;